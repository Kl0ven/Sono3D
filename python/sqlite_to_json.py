import sqlite3
import json

con = sqlite3.connect('PRI.db')

#Pour cette partie on utilise la méthode d'extraction de python vers SQLite le “fetchall”, on ouvre un
#fichier.txt pour écrire notre fichier json avec une boucle et en utilisant la fonction json.dump.

def sql_fetch(con):

	cursorObj = con.cursor()

	cursorObj.execute('SELECT name FROM objects')
	rows_obj = cursorObj.fetchall()

	cursorObj.execute('SELECT type FROM objects')
	rows1_obj = cursorObj.fetchall()

	cursorObj.execute('SELECT params FROM objects')
	rows2_obj = cursorObj.fetchall()

	cursorObj.execute('SELECT name FROM materials')
	rows_mat = cursorObj.fetchall()

	cursorObj.execute('SELECT type FROM materials')
	rows1_mat = cursorObj.fetchall()

	cursorObj.execute('SELECT materiau FROM materials')
	rows2_mat = cursorObj.fetchall()

	cursorObj.execute('SELECT name FROM sounds')
	rows_son = cursorObj.fetchall()

	cursorObj.execute('SELECT uri FROM sounds')
	rows1_son = cursorObj.fetchall()

	cursorObj.execute('SELECT attached_obj FROM sounds')
	rows2_son = cursorObj.fetchall()

	cursorObj.execute('SELECT params FROM sounds')
	rows3_son = cursorObj.fetchall()

	with open('../scene.json', 'w') as outfile:
		objects = []
		materials = []
		sounds = []
		for f in range(len(rows_obj)):
			objects.append({"name": rows_obj[f][0], "type": rows1_obj[f][0], "params": json.loads(rows2_obj[f][0])})
		for f in range(len(rows_mat)):
			materials.append({"name": rows_mat[f][0], "type": rows1_mat[f][0], "materiau": rows2_mat[f][0]})
		for f in range(len(rows_son)):
			sounds.append({"name": rows_son[f][0], "uri": rows1_son[f][0], "attached_obj": json.loads(rows2_son[f][0]), "params": json.loads(rows3_son[f][0])})

		json.dump({"objects": objects, "materials": materials, "sounds": sounds}, outfile, separators=(',',':'), indent=2)
sql_fetch(con)
