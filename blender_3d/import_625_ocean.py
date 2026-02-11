"""
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
obj_path = r"/mnt/user-data/outputs/blender_3d_model/625_Ocean_Street_COMBINED.obj"
if os.path.exists(obj_path):
    bpy.ops.wm.obj_import(filepath=obj_path)
    print(f"Imported: {obj_path}")
else:
    print(f"FILE NOT FOUND: {obj_path}")
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

print("\n=== 625 Ocean Street Setup Complete ===")
print("Press Numpad 0 for camera view")
print("Press Ctrl+F12 to render 360° animation")
print("Press F12 to render single frame")
