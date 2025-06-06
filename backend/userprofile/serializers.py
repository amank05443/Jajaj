# userprofile/serializers.py
from rest_framework import serializers
from .models import  Quals, AircraftMasters, AircraftTypes, AircraftRoles

class QualsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quals
        fields = '__all__'
from userprofile.models.ranks import Ranks
from userprofile.models.quals import Quals
from userprofile.models.users import Users
from userprofile.models.aircraft_masters import AircraftMasters
from userprofile.models.fuel_tanks import FuelTanks

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

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'