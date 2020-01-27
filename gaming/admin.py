from django.contrib import admin

# Register your models here.

from .models import Recipe, Item, Game, Station

admin.site.register(Game)
admin.site.register(Item)
admin.site.register(Station)
admin.site.register(Recipe)
