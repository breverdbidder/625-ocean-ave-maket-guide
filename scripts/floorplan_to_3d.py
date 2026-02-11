"""
625 Ocean Street — Floor Plan to 3D Model Generator
Detects walls from floor plan images and generates OBJ files for Blender import.
Replicates FloorplanToBlender3d core logic using OpenCV.
"""

import cv2
import numpy as np
import os
import json

class FloorplanTo3D:
    def __init__(self, image_path, wall_height=3.0, scale=0.01, name="floorplan"):
        self.image_path = image_path
        self.wall_height = wall_height
        self.scale = scale  # pixels to meters
        self.name = name
        self.img = cv2.imread(image_path)
        if self.img is None:
            raise FileNotFoundError(f"Cannot load image: {image_path}")
        self.gray = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)
        self.h, self.w = self.gray.shape[:2]
        print(f"  Loaded: {self.w}x{self.h}px")
        
    def detect_walls(self, threshold=140, min_wall_length=50, wall_thickness_range=(3, 40)):
        """Detect walls using adaptive thresholding and morphological operations"""
        print("  Detecting walls...")
        
        # Adaptive threshold for construction drawing lines
        _, binary = cv2.threshold(self.gray, threshold, 255, cv2.THRESH_BINARY_INV)
        
        # Morphological operations to connect wall segments
        kernel_h = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 1))
        kernel_v = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 15))
        
        # Detect horizontal walls
        h_walls = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_h)
        h_walls = cv2.dilate(h_walls, cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3)), iterations=1)
        
        # Detect vertical walls
        v_walls = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_v)
        v_walls = cv2.dilate(v_walls, cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3)), iterations=1)
        
        # Combine
        walls = cv2.bitwise_or(h_walls, v_walls)
        
        # Clean up noise
        walls = cv2.morphologyEx(walls, cv2.MORPH_CLOSE, 
                                  cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5)))
        
        # Find contours
        contours, _ = cv2.findContours(walls, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        self.wall_segments = []
        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            area = cv2.contourArea(cnt)
            
            # Filter: must be elongated (wall-like) and minimum size
            if max(w, h) < min_wall_length:
                continue
            if area < 100:
                continue
                
            # Determine if horizontal or vertical wall
            if w > h * 1.5:  # Horizontal
                self.wall_segments.append({
                    'type': 'h',
                    'x': x, 'y': y, 'w': w, 'h': max(h, wall_thickness_range[0]),
                    'cx': x + w/2, 'cy': y + h/2
                })
            elif h > w * 1.5:  # Vertical
                self.wall_segments.append({
                    'type': 'v',
                    'x': x, 'y': y, 'w': max(w, wall_thickness_range[0]), 'h': h,
                    'cx': x + w/2, 'cy': y + h/2
                })
            else:  # Square-ish — likely a junction or thick wall section
                self.wall_segments.append({
                    'type': 'j',
                    'x': x, 'y': y, 'w': w, 'h': h,
                    'cx': x + w/2, 'cy': y + h/2
                })
        
        print(f"  Found {len(self.wall_segments)} wall segments")
        self.walls_image = walls
        return self.wall_segments
    
    def detect_rooms(self):
        """Detect rooms using watershed algorithm"""
        print("  Detecting rooms...")
        
        # Use the wall image to find enclosed rooms
        _, binary = cv2.threshold(self.gray, 140, 255, cv2.THRESH_BINARY)
        
        # Close small gaps in walls
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7))
        closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=2)
        
        # Distance transform to find room centers
        dist = cv2.distanceTransform(closed, cv2.DIST_L2, 5)
        _, dist_thresh = cv2.threshold(dist, 0.3 * dist.max(), 255, 0)
        dist_thresh = np.uint8(dist_thresh)
        
        # Find room markers
        n_labels, labels = cv2.connectedComponents(dist_thresh)
        
        self.rooms = []
        for i in range(1, n_labels):
            mask = (labels == i).astype(np.uint8)
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            if contours:
                cnt = contours[0]
                area = cv2.contourArea(cnt)
                if area > 5000:  # Minimum room size
                    x, y, w, h = cv2.boundingRect(cnt)
                    self.rooms.append({
                        'id': i,
                        'x': x, 'y': y, 'w': w, 'h': h,
                        'area_px': area,
                        'area_m2': area * self.scale * self.scale,
                        'contour': cnt
                    })
        
        print(f"  Found {len(self.rooms)} rooms")
        return self.rooms
    
    def generate_obj(self, output_path, floor_offset=0.0):
        """Generate OBJ file with 3D walls"""
        print(f"  Generating 3D model (height={self.wall_height}m, offset={floor_offset}m)...")
        
        vertices = []
        faces = []
        vertex_count = 0
        
        # Center the model
        cx = self.w / 2
        cy = self.h / 2
        
        for wall in self.wall_segments:
            # Convert pixel coordinates to meters, centered
            x1 = (wall['x'] - cx) * self.scale
            y1 = (wall['y'] - cy) * self.scale
            x2 = (wall['x'] + wall['w'] - cx) * self.scale
            y2 = (wall['y'] + wall['h'] - cy) * self.scale
            z_bottom = floor_offset
            z_top = floor_offset + self.wall_height
            
            # Create a box for each wall segment (8 vertices, 6 faces)
            # Bottom face vertices
            v = [
                (x1, z_bottom, -y1),  # 0: bottom-front-left
                (x2, z_bottom, -y1),  # 1: bottom-front-right
                (x2, z_bottom, -y2),  # 2: bottom-back-right
                (x1, z_bottom, -y2),  # 3: bottom-back-left
                (x1, z_top, -y1),     # 4: top-front-left
                (x2, z_top, -y1),     # 5: top-front-right
                (x2, z_top, -y2),     # 6: top-back-right
                (x1, z_top, -y2),     # 7: top-back-left
            ]
            
            for vx, vy, vz in v:
                vertices.append(f"v {vx:.4f} {vy:.4f} {vz:.4f}")
            
            base = vertex_count + 1  # OBJ is 1-indexed
            
            # 6 faces (quads)
            faces.append(f"f {base} {base+1} {base+2} {base+3}")      # bottom
            faces.append(f"f {base+4} {base+7} {base+6} {base+5}")    # top
            faces.append(f"f {base} {base+4} {base+5} {base+1}")      # front
            faces.append(f"f {base+2} {base+6} {base+7} {base+3}")    # back
            faces.append(f"f {base} {base+3} {base+7} {base+4}")      # left
            faces.append(f"f {base+1} {base+5} {base+6} {base+2}")    # right
            
            vertex_count += 8
        
        # Add floor plate
        fx1 = -cx * self.scale
        fy1 = -cy * self.scale
        fx2 = cx * self.scale
        fy2 = cy * self.scale
        z = floor_offset
        
        vertices.append(f"v {fx1:.4f} {z:.4f} {-fy1:.4f}")
        vertices.append(f"v {fx2:.4f} {z:.4f} {-fy1:.4f}")
        vertices.append(f"v {fx2:.4f} {z:.4f} {-fy2:.4f}")
        vertices.append(f"v {fx1:.4f} {z:.4f} {-fy2:.4f}")
        base = vertex_count + 1
        faces.append(f"f {base} {base+1} {base+2} {base+3}")
        vertex_count += 4
        
        # Write OBJ
        with open(output_path, 'w') as f:
            f.write(f"# 625 Ocean Street - {self.name}\n")
            f.write(f"# Generated from floor plan: {os.path.basename(self.image_path)}\n")
            f.write(f"# Wall height: {self.wall_height}m, Floor offset: {floor_offset}m\n")
            f.write(f"# Vertices: {vertex_count}, Walls: {len(self.wall_segments)}\n\n")
            f.write(f"o {self.name}\n\n")
            f.write('\n'.join(vertices))
            f.write('\n\n')
            f.write('\n'.join(faces))
            f.write('\n')
        
        size_kb = os.path.getsize(output_path) / 1024
        print(f"  ✅ Saved: {output_path} ({size_kb:.0f}KB, {vertex_count} vertices, {len(faces)} faces)")
        return output_path
    
    def generate_debug_image(self, output_path):
        """Save visualization of detected walls"""
        debug = self.img.copy()
        
        for wall in self.wall_segments:
            color = {'h': (0, 255, 0), 'v': (255, 0, 0), 'j': (0, 255, 255)}[wall['type']]
            cv2.rectangle(debug, 
                         (wall['x'], wall['y']), 
                         (wall['x'] + wall['w'], wall['y'] + wall['h']),
                         color, 2)
        
        # Add legend
        cv2.putText(debug, f"Walls: {len(self.wall_segments)}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)
        cv2.putText(debug, "Green=H  Red=V  Yellow=Junction", (20, 80),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (200, 200, 200), 1)
        
        cv2.imwrite(output_path, debug)
        print(f"  📊 Debug image: {output_path}")


def generate_combined_obj(obj_files, output_path):
    """Combine multiple OBJ files into one"""
    all_lines = [f"# 625 Ocean Street - Combined 3-Story Model\n"]
    vertex_offset = 0
    
    for obj_file in obj_files:
        with open(obj_file) as f:
            lines = f.readlines()
        
        vcount = 0
        for line in lines:
            if line.startswith('v '):
                all_lines.append(line)
                vcount += 1
            elif line.startswith('f '):
                # Offset face indices
                parts = line.strip().split()
                new_parts = ['f']
                for p in parts[1:]:
                    new_parts.append(str(int(p) + vertex_offset))
                all_lines.append(' '.join(new_parts) + '\n')
            elif line.startswith('o '):
                all_lines.append(line)
        
        vertex_offset += vcount
    
    with open(output_path, 'w') as f:
        f.writelines(all_lines)
    
    size_kb = os.path.getsize(output_path) / 1024
    print(f"\n🏗️ Combined model: {output_path} ({size_kb:.0f}KB, {vertex_offset} total vertices)")


def generate_blender_script(obj_path, script_path):
    """Generate a Blender Python script to import and set up the scene"""
    script = f'''"""
625 Ocean Street — Blender Import Script
Open Blender → Edit → Preferences → Add-ons → Import-Export: Wavefront OBJ (enable)
Then: File → Open → this .py file  OR  paste into Blender's Script editor
"""
import bpy
import os

# Clear default scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Import OBJ
obj_path = r"{os.path.abspath(obj_path)}"
if os.path.exists(obj_path):
    bpy.ops.wm.obj_import(filepath=obj_path)
    print(f"Imported: {{obj_path}}")
else:
    print(f"FILE NOT FOUND: {{obj_path}}")
    print("Place the .obj file next to this script and update the path above.")

# Select all imported objects
bpy.ops.object.select_all(action='SELECT')

# Add materials
wall_mat = bpy.data.materials.new(name="Wall_Material")
wall_mat.diffuse_color = (0.95, 0.93, 0.88, 1.0)  # Warm white
wall_mat.roughness = 0.7

# Apply to all objects
for obj in bpy.context.selected_objects:
    if obj.type == 'MESH':
        if len(obj.data.materials) == 0:
            obj.data.materials.append(wall_mat)
        else:
            obj.data.materials[0] = wall_mat

# Set up camera for 360° orbit
bpy.ops.object.select_all(action='DESELECT')

# Add empty at center (orbit target)
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 4))
empty = bpy.context.active_object
empty.name = "Orbit_Center"

# Add camera
bpy.ops.object.camera_add(location=(30, -30, 20))
cam = bpy.context.active_object
cam.name = "Orbit_Camera"

# Point camera at center
constraint = cam.constraints.new(type='TRACK_TO')
constraint.target = empty
constraint.track_axis = 'TRACK_NEGATIVE_Z'
constraint.up_axis = 'UP_Y'

# Parent camera to empty (rotate empty = orbit camera)
cam.parent = empty

# Set as active camera
bpy.context.scene.camera = cam

# Add sun light
bpy.ops.object.light_add(type='SUN', location=(10, -10, 20))
sun = bpy.context.active_object
sun.data.energy = 3.0
sun.data.color = (1.0, 0.95, 0.85)  # Warm golden hour

# Add ambient light
bpy.ops.object.light_add(type='AREA', location=(0, 0, 15))
area = bpy.context.active_object
area.data.energy = 100
area.data.size = 20

# Set render engine to Cycles
bpy.context.scene.render.engine = 'CYCLES'
bpy.context.scene.cycles.samples = 128
bpy.context.scene.render.resolution_x = 3840
bpy.context.scene.render.resolution_y = 2160

# Set up 360° animation
bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end = 120
bpy.context.scene.render.fps = 30

# Keyframe rotation
empty.rotation_euler = (0, 0, 0)
empty.keyframe_insert(data_path="rotation_euler", frame=1)
empty.rotation_euler = (0, 0, 6.28318)  # 360 degrees
empty.keyframe_insert(data_path="rotation_euler", frame=120)

# Make rotation linear
for fcurve in empty.animation_data.action.fcurves:
    for kf in fcurve.keyframe_points:
        kf.interpolation = 'LINEAR'

# Set background
bpy.context.scene.world.use_nodes = True
bg = bpy.context.scene.world.node_tree.nodes['Background']
bg.inputs[0].default_value = (0.6, 0.75, 0.9, 1.0)  # Light blue sky
bg.inputs[1].default_value = 0.5

# Frame all objects
bpy.ops.object.select_all(action='SELECT')
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        override = bpy.context.copy()
        override['area'] = area
        override['region'] = area.regions[-1]
        with bpy.context.temp_override(**override):
            bpy.ops.view3d.view_all()
        break

print("\\n=== 625 Ocean Street Setup Complete ===")
print("Press Numpad 0 for camera view")
print("Press Ctrl+F12 to render 360° animation")
print("Press F12 to render single frame")
'''
    
    with open(script_path, 'w') as f:
        f.write(script)
    print(f"📜 Blender script: {script_path}")


# ============================================
# MAIN EXECUTION
# ============================================
if __name__ == "__main__":
    input_dir = "/mnt/user-data/outputs/blender_ftbl"
    output_dir = "/mnt/user-data/outputs/blender_3d_model"
    os.makedirs(output_dir, exist_ok=True)
    
    floors = [
        {
            'image': f"{input_dir}/A3_Level1_clean.png",
            'name': 'Level1_First_Floor',
            'height': 3.0,
            'offset': 0.0,
            'desc': 'First Level (A3)'
        },
        {
            'image': f"{input_dir}/A4_Level2_clean.png",
            'name': 'Level2_Second_Floor',
            'height': 2.7,
            'offset': 3.0,
            'desc': 'Second Level (A4)'
        },
        {
            'image': f"{input_dir}/A5_Level3_clean.png",
            'name': 'Level3_Third_Floor',
            'height': 2.4,
            'offset': 5.7,
            'desc': 'Third Level (A5)'
        }
    ]
    
    obj_files = []
    stats = []
    
    for floor in floors:
        print(f"\n{'='*50}")
        print(f"Processing: {floor['desc']}")
        print(f"{'='*50}")
        
        fp = FloorplanTo3D(
            floor['image'],
            wall_height=floor['height'],
            scale=0.008,  # Calibrated for construction drawing scale
            name=floor['name']
        )
        
        walls = fp.detect_walls(threshold=150, min_wall_length=40)
        rooms = fp.detect_rooms()
        
        obj_path = f"{output_dir}/{floor['name']}.obj"
        fp.generate_obj(obj_path, floor_offset=floor['offset'])
        obj_files.append(obj_path)
        
        debug_path = f"{output_dir}/{floor['name']}_walls_detected.png"
        fp.generate_debug_image(debug_path)
        
        stats.append({
            'floor': floor['desc'],
            'walls': len(walls),
            'rooms': len(rooms),
            'height': floor['height'],
            'offset': floor['offset']
        })
    
    # Generate combined 3-story model
    combined_path = f"{output_dir}/625_Ocean_Street_COMBINED.obj"
    generate_combined_obj(obj_files, combined_path)
    
    # Generate Blender import script
    script_path = f"{output_dir}/import_625_ocean.py"
    generate_blender_script(combined_path, script_path)
    
    # Summary
    print(f"\n{'='*50}")
    print("625 OCEAN STREET — 3D MODEL GENERATION COMPLETE")
    print(f"{'='*50}")
    for s in stats:
        print(f"  {s['floor']}: {s['walls']} walls, {s['rooms']} rooms (h={s['height']}m, offset={s['offset']}m)")
    print(f"\n📁 Output files in: {output_dir}/")
    print(f"  🏠 Individual: Level1.obj, Level2.obj, Level3.obj")
    print(f"  🏗️ Combined:   625_Ocean_Street_COMBINED.obj")
    print(f"  📜 Script:     import_625_ocean.py")
    print(f"  📊 Debug:      *_walls_detected.png")
    print(f"\n🚀 NEXT: Open Blender → File → Import → Wavefront (.obj)")
    print(f"   OR: Run import_625_ocean.py in Blender's Script Editor")
