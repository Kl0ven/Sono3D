import sqlite3
import json 
import argparse

parser = argparse.ArgumentParser(description='Choisissez lobjet')

parser.add_argument("-m","--mot", help="Mot-Clé")

args = parser.parse_args()

mot = args.mot
table = ('objects', 'materials', 'sounds')

con = sqlite3.connect('input_bdd/PRI_sprint1.db')
 
#Pour cette partie on utilise la méthode d'extraction de python vers SQLite le “fetchall”, on ouvre un
#fichier.txt pour écrire notre fichier json avec une boucle et en utilisant la fonction json.dump.

def sql_fetch(con):
 
    cursorObj = con.cursor()
 
    cursorObj.execute('SELECT name FROM objects')
    rows_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT type FROM objects')
    rows1_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT attached_sound FROM objects')
    rows2_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT attached_sound_clic FROM objects')
    rows3_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT attached_sound_look FROM objects')
    rows4_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT params FROM objects')
    rows5_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT mot_cle FROM objects')
    rows6_obj = cursorObj.fetchall()

    cursorObj.execute('SELECT name FROM materials')
    rows_mat = cursorObj.fetchall()

    cursorObj.execute('SELECT type FROM materials')
    rows1_mat = cursorObj.fetchall()

    cursorObj.execute('SELECT materiau FROM materials')
    rows2_mat = cursorObj.fetchall()

    cursorObj.execute('SELECT mot_cle FROM materials')
    rows3_mat = cursorObj.fetchall()

    cursorObj.execute('SELECT name FROM sounds')
    rows_son = cursorObj.fetchall()

    cursorObj.execute('SELECT uri FROM sounds')
    rows1_son = cursorObj.fetchall()
    
    cursorObj.execute('SELECT params FROM sounds')
    rows2_son = cursorObj.fetchall()

    cursorObj.execute('SELECT mot_cle FROM sounds')
    rows3_son = cursorObj.fetchall()
 
    with open('scenario_mot_cle.json', 'w') as outfile:  
        objects = []
        materials = []
        sounds = [] 
        count_objects = 0
        count_materials = 0
        count_sounds = 0
        out = {"objects":[],
        "sounds":[]}
        for f in range(len(rows_obj)):
            count_objects += 1
            if rows6_obj[f][0] == mot:
                objects.append({"name": rows_obj[f][0], "type": rows1_obj[f][0], "attached_sound": json.loads(rows2_obj[f][0]), "attached_sound_clic": json.loads(rows3_obj[f][0]), "attached_sound_look": json.loads(rows4_obj[f][0]), "params": json.loads(rows5_obj[f][0]), "mot_cle": rows6_obj[f][0]})
            
                
        out["objects"]= objects
        for f in range(len(rows_son)):
            count_sounds += 1
            if rows3_son[f][0] == mot:
                sounds.append({"name": rows_son[f][0], "uri": rows1_son[f][0], "params": json.loads(rows2_son[f][0]), "mot_cle": rows3_son[f][0]})
            
        out["sounds"] = sounds
        json.dump(out, outfile, separators=(',',':'), indent=2)
        

sql_fetch(con)

