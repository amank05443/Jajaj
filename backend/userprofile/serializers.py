# userprofile/serializers.py
from rest_framework import serializers
# from .models import  Users, Quals, Trades ,Ranks, UserQuals, AircraftMasters, AircraftTypes, AircraftRoles,ChangeOfServiceabilityLogs, FuelTanks, EcuMasters, TyrePressures, Pols, Systems,Customers

from .models import Users, Quals, Ranks, AircraftMasters, AircraftTypes, AircraftRoles, ChangeOfServiceabilityLogs, \
    FuelTanks, EcuMasters, TyrePressures, Pols, Systems, Customers, HowFoundDefects, EntryTypes, Items, Trades, \
    UserQuals, LimDefrDefLogs


#--for dynamic views and urls--particularly for useTableapi:-Abhishek Singh
def get_dynamic_serializer(model_class):
    class DynamicSerializer(serializers.ModelSerializer):
        class Meta:
            model = model_class
            fields = '__all__'

        def to_representation(self, instance):
            data = super().to_representation(instance)
            include = self.context.get('include') or []
            if isinstance(include,str):
                include = [f.strip() for f in include.split(',')]
            elif isinstance(include,list) and len(include)==1 and isinstance(include[0],str) and ',' in include[0] :
                include = [i.strip() for i in include[0].split(',')]

            for field_name in include:
                try:
                    related = getattr(instance, field_name, None)
                    if related is None:
                        data[field_name] = None
                    elif hasattr(related, 'all'):
                        related_qs = related.all()
                        if related_qs:
                            rel_model = related_qs.model
                            rel_serializer = get_dynamic_serializer(rel_model)
                            data[field_name] = rel_serializer(related_qs,many=True).data
                        else:
                            data[field_name] = []
                    else:
                        rel_model = related.__class__
                        rel_serializer = get_dynamic_serializer(rel_model)
                        data[field_name] = rel_serializer(related, context={}).data
                except Exception as e:
                    data[field_name] = f'Error: {str(e)}'
            return data
    return DynamicSerializer

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

class TradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trades
        fields = '__all__'

class UserQualsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuals
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

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'

class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'

class ChangeOfServiceabilityLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeOfServiceabilityLogs
        fields = '__all__'

class HowFoundDefectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowFoundDefects
        fields = '__all__'

class EntryTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryTypes
        fields = '__all__'

class LimDefrDefLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LimDefrDefLogs
        fields = '__all__'