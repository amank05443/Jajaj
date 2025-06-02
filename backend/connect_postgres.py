import psycopg2


conn= psycopg2.connect(
    host="172.17.1.211/32",
    database='nams_700',
    user='e700_214',
    password='<ilmsair>',
    port='5432',
)
cursor = conn.cursor()
cursor.execute("SELECT version();")
version = cursor.fetchone()
print("PostgreSQL version:", version[0])
cursor.close()
conn.close()