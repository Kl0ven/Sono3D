import json

data = {}
data['objects'] = []
data['materials'] = []
data['sounds'] = []
data['objects'].append({
    'name': 'sol',
    'type': 'ground',
    'params': {}
})
data['objects'].append({
    'name': 'camera',
    'type': 'camera',
    'params': {}
})
data['objects'].append({
    'name': 'sph01',
    'type': 'sphere',
    'params': {"position": [1, 2, 3],"radius":1.0}
})
data['objects'].append({
    'name': 'sph02',
    'type': 'sphere',
    'params': {"radius": 2.0}
})

data['objects'].append({
    'name': 'tree1',
    'type': 'tree',
    'params': {"sizebranch": 17, "sizetrunk":12, "radius":3, "position": [1,2,3]}
})

data['objects'].append({
    'name': 'tree2',
    'type': 'tree',
    'params': {"sizebranch": 17, "sizetrunk":12, "radius":3, "position": [30,2,20]}
})
data['objects'].append({
    'name': 'tree3',
    'type': 'tree',
    'params': {"sizebranch": 17, "sizetrunk":12, "radius":3, "position": [-30,2,20]}
})


data['materials'].append({
    'name': 'mat01',
    'type': 'materiau',
    'materiau': {}
})
data['materials'].append({
    'name': 'mat02',
    'type': 'materiau',
    'materiau': {}
})
data['sounds'].append({
    'name': 'chant-oiseaux_1',
    'uri': './assets/sounds/birds/birds.wav',
    "attached_obj": [],
    'params': {"volume": 0.1, "loop":'true', "autoplay":'true',"spatialSound":'false'}
})

data['sounds'].append({
    'name': 'chant-oiseaux_2',
    'uri': './assets/sounds/birds/bird_1.wav',
    "attached_obj": ["tree1"],
    'params': {"volume": 0.2, "loop":'true', "autoplay":'true',"spatialSound":'true'}
})
data['sounds'].append({
    'name': 'chant-oiseaux_3',
    'uri': './assets/sounds/birds/bird_2.wav',
    "attached_obj": ["tree2"],
    'params': {"volume": 0.2, "loop":'true', "autoplay":'true',"spatialSound":'true'}
})
data['sounds'].append({
    'name': 'chant-oiseaux_4',
    'uri': './assets/sounds/birds/bird_3.wav',
    "attached_obj": ["tree3"],
    'params': {"volume": 0.1, "loop":'true', "autoplay":'true',"spatialSound":'true'}
})
data['sounds'].append({
    'name': 'hymne',
    'uri': './assets/sounds/Island/anthem.wav',
    "attached_obj": ["sph01"],
    'params': {"volume": 0.50, "loop":'true', "autoplay":'true',"spatialSound":'true'}
})

with open('datatest.json', 'w') as outfile:
    json.dump(data, outfile, indent=2)
