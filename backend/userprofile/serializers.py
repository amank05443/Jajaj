# userprofile/serializers.py
from rest_framework import serializers
from .models import  Users, Quals,Ranks, AircraftMasters, AircraftTypes, AircraftRoles, FuelTanks, EcuMasters, TyrePressures, Pols, Systems

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class RanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranks
        fields = '__all__'

class QualsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quals
        fields = '__all__'

class AircraftMastersSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftMasters
        fields = '__all__'

class AircraftTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftTypes
        fields = '__all__'

class AircraftRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftRoles
        fields = '__all__'

class FuelTanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelTanks
        fields = '__all__'

class EcuMastersSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcuMasters
        fields = '__all__'

class TyrePressuresSerializer(serializers.ModelSerializer):
    class Meta:
        model = TyrePressures
        fields = '__all__'

class PolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pols
        fields = '__all__'

class SystemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Systems
        fields = '__all__'
