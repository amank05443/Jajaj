# from jpype.types import *
import jpype
from jpype import JClass
from enum import Enum

# Inicializa o ambiente JPype
jpype.startJVM(jpype.getDefaultJVMPath())

# Definição dinâmica da enumeração TypeJava
TypeJava = Enum('TypeJava', [('Array', 'JArray'), ('Class', 'JClass'),
                             ('Boolean', 'JBoolean'), ('Byte', 'JByte'),
                             ('Char', 'JChar'), ('Short', 'JShort'),
                             ('Int', 'JInt'), ('Long', 'JLong'),
                             ('Float', 'JFloat'), ('Double', 'JDouble'),
                             ('String', 'JString'), ('Object', 'JObject')])


# Função para obter uma instância específica da enumeração TypeJava
def get_type_instance(value):
    for type_instance in TypeJava:
        if type_instance.name == value:
            return getattr(jpype.types, type_instance.value)


type_java_class = get_type_instance('String')
teste = type_java_class('abc')
print(type(teste))

parameters = {'name_param': {'value': '', 'type': TypeJava.Array}}