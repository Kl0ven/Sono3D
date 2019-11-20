import csv
import sqlite3
conn = sqlite3.connect('BddSono3D.db')
c = conn.cursor()
with open('InputMeshs.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-3):
    nom = ArraySon[i+2][0]
    typeM = ArraySon[i+2][1]
    scale_x = ArraySon[i+2][2]
    scale_y = ArraySon[i+2][3]
    scale_z = ArraySon[i+2][4]
    nom_seq_click = ArraySon[i+2][5]
    nom_seq_nimbus = ArraySon[i+2][6]
    nom_seq_focus = ArraySon[i+2][7]
    nom_seq_classic = ArraySon[i+2][8]
    x = ArraySon[i+2][9]
    y = ArraySon[i+2][10]
    z = ArraySon[i+2][11]
    radius_nimbus = ArraySon[i+2][12]
    uri = ArraySon[i+2][13]
    if (len(ArraySon[i+3][0])==0):
        next_id = None
    elif (len(ArraySon[i+2][0])==0):
        next_id = None
    else:
        next_id=i+2
    
    li=(nom,typeM,scale_x,scale_y,scale_z,nom_seq_click,nom_seq_nimbus,nom_seq_focus,nom_seq_classic,x,y,z,radius_nimbus,next_id,uri)
    c.execute("INSERT INTO Meshs(nom,type,scale_x,scale_y,scale_z,nom_seq_click,nom_seq_nimbus,nom_seq_focus,nom_seq_classic,x,y,z,radius_nimbus,next_id,uri) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",li)
    conn.commit()
c.execute("SELECT * FROM Meshs")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()