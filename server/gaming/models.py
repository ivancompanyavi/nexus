from django.db import models


class Game(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Item(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name


class Station(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='stations')
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='recipes')
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='recipes')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    amount = models.IntegerField(default=1)
    ing_1 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    ing_1_amount = models.IntegerField(default=0)
    ing_2 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    ing_2_amount = models.IntegerField(default=0)
    ing_3 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    ing_3_amount = models.IntegerField(default=0)
    ing_4 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    ing_4_amount = models.IntegerField(default=0)
    ing_5 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    ing_5_amount = models.IntegerField(default=0)

    def __str__(self):
        return "{} (x{})".format(str(self.item), self.amount)
