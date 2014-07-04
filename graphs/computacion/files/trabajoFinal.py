#-*- coding: utf-8 -*-

from xlrd import open_workbook
from sys import argv
import os
from rdflib import Graph,URIRef, BNode, Literal,Namespace,XSD
from rdflib.namespace import RDF

wb = open_workbook("bdExcel.xls")

r=Namespace('http://verdata.cl/graphs/computacion#')

u=Namespace('http://verdata.cl/graphs/universidad/')
i=Namespace('http://verdata.cl/graphs/investigacion/')
e=Namespace('http://verdata.cl/graphs/escuela/')
p=Namespace('http://verdata.cl/graphs/persona/')
c=Namespace('http://verdata.cl/graphs/curso/')
a=Namespace('http://verdata.cl/graphs/area/')
ca=Namespace('http://verdata.cl/graphs/carrera/')
ad=Namespace('http://verdata.cl/graphs/act_administrativa/')
adm=Namespace('http://verdata.cl/graphs/admision/')
ic=Namespace('http://verdata.cl/graphs/instanciaCurso/')


g = Graph()

#******UNIVERSIDAD*******

s  = wb.sheets()[0]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()  
    g.add( (u[uni],r.nombre,Literal(s.cell(row,1).value.strip())) )
    g.add( (u[uni],r.eUniversidad,Literal(s.cell(row,2).value.strip())) )
    g.add( (u[uni],r.tipoU,Literal(s.cell(row,3).value.strip())) )
    g.add( (u[uni],r.acronimo,Literal(s.cell(row,4).value.strip())) )
    g.add( (u[uni],r.fundacion,Literal(str(int(s.cell(row,5).value)).strip())) )
    g.add( (u[uni],r.sede,Literal(s.cell(row,6).value.strip())) )

    g.add( (u[uni],RDF.type,r.Universidad ))
    


#******EscuelaProfesional***********

s  = wb.sheets()[1]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()
    g.add( (e[uni],r.facultad,Literal(s.cell(row,2).value.strip())) )
    g.add( (e[uni],r.nombre,Literal(s.cell(row,3).value.strip())) )
    g.add( (e[uni],r.eResena,Literal(s.cell(row,4).value.strip())) )
    
    g.add( (e[uni],r.pertenece,u[str(int(s.cell(row,0).value)).strip()]) )

    g.add( (e[uni],RDF.type,r.EscuelaProfesional ))
    

#******Investigacion***********


s  = wb.sheets()[2]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()
    g.add( (i[uni],r.eReporte,Literal(s.cell(row,2).value.strip())) )    
    g.add( (i[uni],r.eLaboCentros,Literal(s.cell(row,3).value.strip())) )
    g.add( (i[uni],r.eProyecto,Literal(s.cell(row,4).value.strip())) )
    g.add( (i[uni],r.ePublicacion,Literal(s.cell(row,5).value.strip())) )

    g.add( (e[uni],r.escuelaInvestigacion,i[uni] ))

    g.add( (i[uni],RDF.type,r.Investigacion ))

#******Admision***********


s  = wb.sheets()[3]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()
    g.add( (adm[uni],r.eBecasBen,Literal(s.cell(row,2).value.strip())) )    
    g.add( (adm[uni],r.eFecha,Literal(s.cell(row,3).value.strip())) )
    g.add( (adm[uni],r.eMatricula,Literal(s.cell(row,4).value.strip())) )
    g.add( (adm[uni],r.ePlanEstudio,Literal(s.cell(row,5).value.strip())) )
    g.add( (adm[uni],r.eAdmision,Literal(s.cell(row,6).value.strip())) )

    g.add( (e[uni],r.escuelaAdmision,adm[uni] ))

    g.add( (adm[uni],RDF.type,r.Admision ))
        
    
#******Persona***********


s  = wb.sheets()[4]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],r.apellidoPaterno,Literal(s.cell(row,1).value.strip())) )    
    g.add( (p[uni],r.apellidoMaterno,Literal(s.cell(row,2).value)) )
    g.add( (p[uni],r.nombre,Literal(s.cell(row,3).value.strip())) )
    g.add( (p[uni],r.fechaNacimiento,Literal(str(s.cell(row,4).value).strip(),datatype=XSD.date)) )
    g.add( (p[uni],r.sexo,Literal(s.cell(row,5).value.strip())) )

    g.add( (e[str(int(s.cell(row,6).value)).strip()+'-'+str(int(s.cell(row,7).value)).strip()],r.escuelaPersona,p[uni]))

    g.add( (p[uni],RDF.type,r.Persona ))


#******Alumno***********

s  = wb.sheets()[5]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],RDF.type,r.Alumno) )    
    
#******Funcionario***********

s  = wb.sheets()[6]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],RDF.type,r.Funcionario) ) 


#******Academico***********

s  = wb.sheets()[7]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],r.eCurriculum,Literal(s.cell(row,1).value.strip())) )
    g.add( (p[uni],r.eProyecto,Literal(s.cell(row,2).value.strip())) )
    g.add( (p[uni],r.ePublicacion,Literal(s.cell(row,3).value.strip())) )
    g.add( (p[uni],r.eTemaMemoria,Literal(s.cell(row,4).value.strip())) )
    g.add( (p[uni],r.TituloGrado,Literal(s.cell(row,5).value.strip())) )

    g.add( (p[uni],RDF.type,r.Academico) )

#******Acedemico Visitante***********

s  = wb.sheets()[8]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],RDF.type,r.AcademicoVisitante) )

#******Acedemico Jornada Parcial***********

s  = wb.sheets()[9]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],r.actividadProfesional,Literal(s.cell(row,1).value.strip())) )

    g.add( (p[uni],RDF.type,r.AcademicoJornadaParcial) )

#******Acedemico Jornada Completa***********

s  = wb.sheets()[10]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],r.jerarquia,Literal(s.cell(row,1).value.strip())) )

    g.add( (p[uni],RDF.type,r.AcademicoJornadaCompleta) )
    

#******Curso***********

s  = wb.sheets()[11]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()+'-'+str(s.cell(row,2).value).strip()
    unie=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()

    g.add( (c[uni],r.eCurso,Literal(s.cell(row,3).value.strip())) )
    g.add( (c[uni],r.nombre,Literal(s.cell(row,4).value.strip())) )

    g.add( (c[uni],RDF.type,r.Curso) )

    g.add( (e[unie],r.escuelaCurso,c[uni]) )

#******Instancia de Curso***********

s  = wb.sheets()[12]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uniA=str(int(s.cell(row,0).value)).strip()
    uniC= str(int(s.cell(row,1).value)).strip()+'-'+str(int(s.cell(row,2).value)).strip()+'-'+str(s.cell(row,3).value).strip()
    uni=uniA+'-'+uniC

    g.add( (ic[uni],r.cursoCorresponde,c[uniC]))
    g.add( (p[uniA],r.cursosDictados,ic[uni]))
    
    
    g.add( (ic[uni],r.eInstCurso,Literal(s.cell(row,4).value.strip())) )

    g.add( (ic[uni],RDF.type,r.InstanciaCurso) )

#****** Area ***********

s  = wb.sheets()[13]# Paginas del Excel
rows = s.nrows# Numero de paginas del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (a[uni],r.nombre,Literal(s.cell(row,1).value.strip())) )

    g.add( (a[uni],RDF.type,r.Area) )

#****** Area - Investifacion***********

s  = wb.sheets()[14]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,1).value)).strip()+'-'+str(int(s.cell(row,2).value)).strip()
    g.add( (i[uni],r.investigacionArea,a[str(int(s.cell(row,0).value)).strip()]) )

#****** Carrera ***********

s  = wb.sheets()[15]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()+'-'+str(int(s.cell(row,1).value)).strip()
    g.add( (ca[uni],r.eMalla,Literal(s.cell(row,2).value.strip())) )
    g.add( (ca[uni],r.eObjetivos,Literal(s.cell(row,3).value.strip())) )
    g.add( (ca[uni],r.ePlan,Literal(s.cell(row,4).value.strip())) )
    g.add( (ca[uni],r.eRequisitos,Literal(s.cell(row,5).value.strip())) )
    g.add( (ca[uni],r.nombre,Literal(s.cell(row,6).value.strip())) )

    g.add( (ca[uni],RDF.type,r.Carrera) )

    g.add( (e[uni],r.escuelaCarrera,ca[uni]) )

    
#****** Actividad Administrativa ***********

s  = wb.sheets()[16]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (ad[uni],r.nombre,Literal(s.cell(row,1).value.strip())) )

    g.add( (ad[uni],RDF.type,r.Actividades) )

#****** Actividad Academico ***********

s  = wb.sheets()[17]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,1).value)).strip()
    g.add( (p[uni],r.academicoActividad,ad[str(int(s.cell(row,0).value)).strip()]) )

#****** Investigador Area ***********

s  = wb.sheets()[18]# Paginas del Excel
rows = s.nrows# Numero de pagines del Excel.

for row in range(1, rows):
    uni=str(int(s.cell(row,0).value)).strip()
    g.add( (p[uni],r.investigadorArea,a[str(int(s.cell(row,1).value)).strip()]) )
    

        
g.bind("r", r)
g.bind("u", u)
g.bind("e", e)
g.bind("p", p)
g.bind("c", c)
g.bind("ca", ca)
g.bind("ad", ad)
g.bind("a", a)
g.bind("ic", ic)
g.bind("adm", adm)

archi=open('datos.txt','w')
archi.close()
           
print g.serialize(destination='datos.txt',format='turtle')
