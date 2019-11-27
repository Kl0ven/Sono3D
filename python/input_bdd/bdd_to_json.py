import sqlite3,json,sys

sounds_names = []

connexion = sqlite3.connect('BddSono3D.db')
#####################################
## SOUNDS                          ##
#####################################

def load_sounds():
    global sounds_names
    sounds_names = list(set(sounds_names))
    cursor = connexion.cursor()
    sounds = []
    for son in sounds_names:
        cursor.execute("SELECT * FROM Son WHERE nom='" + son + "'")
        infos = cursor.fetchall()[0]
        if infos[6] == 1:
            sounds.append({"nom":infos[1],"uri":infos[2],"volume":float(infos[5]),"spatial":True})
        else:
            sounds.append({"nom":infos[1],"uri":infos[2],"volume":float(infos[5]),"spatial":False})
    return sounds



#####################################
## SEQUENCEUR                      ##
#####################################
def load_sequenceurs(meshs):
    sequencers_names = []
    sequencers = []
    for mesh in meshs:
        seqs_names = [ mesh["nom_seq_click"],
                      mesh["nom_seq_focus"],
                      mesh["nom_seq_nimbus"],
                      mesh["nom_seq_classic"]]
        sequencers_names+=seqs_names
    sequencers_names = list(set(sequencers_names))
    for seq in sequencers_names:
        sequencers.append(load_sequenceur(sequenceur_name=seq))
    return sequencers

def load_sequenceur(sequenceur_name=None):
    global sounds_names
    cursor = connexion.cursor()
    cursor.execute("SELECT * FROM Sequenceur WHERE nom='"+sequenceur_name+"'")
    infos = cursor.fetchall()
    sounds = []
    loop = None
    for s in infos:
        sounds.append([s[1],s[3],s[2],s[0]])
        if s[6] == 1:
            loop = True
        else:
            loop = False
    sounds = sorted(sounds,key=lambda sound: sound[3])
    sounds_cleaned = []
    for s in sounds:
        sounds_cleaned.append(s[0:3])
        sounds_names.append(s[1])
    sequenceur = {"nom":sequenceur_name,
                  "loop": loop,#TODO:
                  "sons":sounds_cleaned
    }
    return sequenceur

#####################################
## MESHS                           ##
#####################################

def load_meshs(first_mesh_name):
    meshs = []
    mesh = load_mesh_from_name(first_mesh_name)
    next_id = mesh[14]
    meshs.append(mesh)
    meshs_output = []
    meshs_output.append({"nom": mesh[1],
                      "type": mesh[2],
                      "scale_x": float(mesh[3]),
                      "scale_y": float(mesh[4]),
                      "scale_z": float(mesh[5]),
                      "nom_seq_click":mesh[6],
                      "nom_seq_focus": mesh[7],
                      "nom_seq_nimbus": mesh[8],
                      "nom_seq_classic": mesh[9],
                      "x" : float(mesh[10]),
                      "y" : float(mesh[11]),
                      "z" : float(mesh[12]),
                      "radius_nimbus": float(mesh[13]),
                      "uri":mesh[15]})
    while next_id is not None:
        mesh = load_mesh_from_id(next_id)[0]
        meshs_output.append({"nom": mesh[1],
                      "type": mesh[2],
                      "scale_x": float(mesh[3]),
                      "scale_y": float(mesh[4]),
                      "scale_z": float(mesh[5]),
                      "nom_seq_click":mesh[6],
                      "nom_seq_focus": mesh[7],
                      "nom_seq_nimbus": mesh[8],
                      "nom_seq_classic": mesh[9],
                      "x" : float(mesh[10]),
                      "y" : float(mesh[11]),
                      "z" : float(mesh[12]),
                      "radius_nimbus": float(mesh[13]),
                      "uri":mesh[15]})

        next_id = mesh[14]

    return meshs_output


def load_mesh_from_id(id):
    cursor_obj = connexion.cursor()
    cursor_obj.execute('SELECT * FROM Meshs WHERE id="' + str(id)+'"')
    mesh = cursor_obj.fetchall()

    return mesh


def load_mesh_from_name(mesh_name):
    cursor_obj = connexion.cursor()
    cursor_obj.execute("SELECT * FROM Meshs WHERE nom='"+mesh_name+"'")
    mesh = cursor_obj.fetchall()[0]
    return mesh

#####################################
## SCENE                           ##
#####################################


def load_scene(name):
    cursor_obj = connexion.cursor()
    cursor_obj.execute("SELECT * FROM Scene WHERE nom='"+name+"'")
    scene = cursor_obj.fetchall()
    print(scene)
    first_mesh_name = scene[0][2]
    meshs = load_meshs(first_mesh_name)
    sequenceurs = load_sequenceurs(meshs)
    sounds = load_sounds()
    with open("../../scene.json","w") as f:
        json.dump({"sequenceur":sequenceurs,"sons":sounds,"meshs":meshs},f,sort_keys=True,indent=4)


if __name__ == '__main__':
    try:
        nom_scene = sys.argv[1]
    except:
        print("you have to put a scene name")

    load_scene(nom_scene)
