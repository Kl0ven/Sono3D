#Il faut d'abord importer sqlite3 et json, ouvrir une connexion à SQLite et créer les tables
import sqlite3
from sqlite3 import Error
import json

def sql_connection():

    try:
        con = sqlite3.connect('PRI.db')
        return con

    except Error:
        print(Error)

def sql_table_objects(con):

    cursorObj = con.cursor()

    cursorObj.execute("CREATE TABLE objects(name text, type text, params text)")

    con.commit()

def sql_table_materials(con):

    cursorObj = con.cursor()

    cursorObj.execute("CREATE TABLE materials(name text, type text, materiau text)")

    con.commit()

def sql_table_sounds(con):

    cursorObj = con.cursor()

    cursorObj.execute("CREATE TABLE sounds(name text, uri text ,attached_obj text, params text)")

    con.commit()

con = sql_connection()

sql_table_objects(con)
sql_table_materials(con)
sql_table_sounds(con)

con = sqlite3.connect('PRI.db')

#Pour passer de json à sqlite nous utilisons ces trois fonctions d'insertion (sql_insert_objects,
#sql_insert_materials,sql_insert_sounds) dans les tables respectives avec les variables "entities"

def sql_insert_objects(con, entities_objects):

    cursorObj = con.cursor()

    cursorObj.execute('INSERT INTO objects(name, type, params) VALUES(?, ?, ?)', entities_objects)

    con.commit()

def sql_insert_materials(con, entities_materials):

    cursorObj = con.cursor()

    cursorObj.execute('INSERT INTO materials(name, type, materiau) VALUES(?, ?, ?)', entities_materials)

    con.commit()

def sql_insert_sounds(con, entities_sounds):

    cursorObj = con.cursor()

    cursorObj.execute('INSERT INTO sounds(name, uri, attached_obj, params) VALUES(?, ?, ?, ?)', entities_sounds)

    con.commit()

#Pour donner de la valeur à ces variables "entities" on utilise quelques boucles que l'on peut voir
#ci-dessous. Nous ouvrons le fichier "datatest.txt" et prenons les valeurs à charger sur les "entités".

with open('datatest.json') as json_file:
    data = json.load(json_file)
    for p in data['objects']:
        entities_objects = (str(p['name']), str(p['type']), json.dumps(p['params']))
        sql_insert_objects(con, entities_objects)
    for p in data['materials']:
        entities_materials = (str(p['name']), str(p['type']), str(p['materiau']))
        sql_insert_materials(con, entities_materials)
    for p in data['sounds']:
        entities_sounds = (str(p['name']), str(p['uri']), json.dumps(p['attached_obj']), json.dumps(p['params']))
        sql_insert_sounds(con, entities_sounds)
