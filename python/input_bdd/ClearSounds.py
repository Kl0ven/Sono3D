import sqlite3
conn = sqlite3.connect('PRI_sprint1.db')
c = conn.cursor()
c.execute("DELETE FROM sounds")
conn.commit()