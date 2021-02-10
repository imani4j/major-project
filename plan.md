# Plan
## (you can ignore this if you want, but you might find it interesting, so feel free to look through)
### This is just a place to organize my thoughts and stuff. I'd use paper, but since I'll be working from two different places its better to just have it digitally instead of trusting myself to bring a paper everyday
then again i do better when i draw things out so idk

## plan stuff goes down here

also note to self: add some of this stuff to proposal.md.
### Buying Resources

    ~we dont need to differentiate between different kinds of food, so having one food ~variable~ object should work~
    same with warm clothes. ~we can just pretend they're onesies or something~
    ACTUALLY NO THEY'LL BE SPACE SUITS
    sometimes my genius frightens me
    spare parts might be different, but honestly i dont have time so i'll just use one ~varaible~ for that too.
    and money~

    actually no I'll make everything but money an object so I can hold both the amount and the price. That way i won't have tons of different if statments for different resources. I'll just use a parameter in the buying function and subsitute them out

    so 1 variable:

    -money

    and four different objects:

    -food
    -spare clothes
    -spare parts
    -medicine (new addition)

    these will hold: amount and price

    buying different kinds of anything isnt necessary, so they can all have one price. It's nice when things are more expensive in some places (and by nice I mean annoying for the player, but nice as a game mechanic), but once again i dont got time

    ~so maybe 3 more variables:~

    ~-food price~
    ~-spare clothes price~
    ~-spare parts price~

    when the player purchases something, if the money variable is bigger or equal to the price of the item, it will subtract the price from the money variable
    damn i havent written any code at all but i already feel like im getting somewhere

### Using Resources

    The way the Oregon Trail works is that you slowly use up resources (mostly food) during your journey. This depends on the amount of people you have in your party, as well as the ration size the player sets. I think that's important, so I'm going to try implementing that (though its not necessary)

    so I'll have another variable:

        - Ration size

    and a new function:

        -Change Ration Size

    this can be changed by the player at anytime. By default it'll be average, but they can make it smaller or bigger. (I should find good names for the different sizes later and put them here:
        - _ (large) (4 pounds)
        - _ (medium) (3 pounds)
        - _ (small) (2 pounds)
        )

~Reminder to search up how much food an average person eats a day~
3-4 pounds a day
then again these are aliens so it probably doesnt matter
speaking of aliens and the party...

## Party (the group you travel with, like in Pokemon, not a birthday party)

It would be nice if you could give them all names, and it probably won't be hard, but it's not important

~I don't remember how many people are in your party in "The Oregon Trail". I should search that up.~
~ok its just giving me results for the actual Oregin Trail so~ I'll just make the number 5.

~Party should probably be a variable so I can calculate how much food is eaten every day~
Nope it should be an array called Party full of objects. Each party member can be an object with things like:

-Health
-Name
-isAlive
-isSick (new addition)

so i can calculate overall party health and how many living party members there are. This will also make changing names easy

So that makes another variable:

-Party Member Count

I'll iterate through the Party array, check the isAlive of the party members, and set the Party Member Count to the amount of living patry members.

If the Health of a Party Member reaches zero, they die.
When they die in a Random Unfortunate Event, the Health will be set to zero
And diseases and and injuries can be variables that are subtracted from Health every round until they are healed with medicine.

~(Problem: how to remove the injury/disease status when medicine is used. Just setting it to full will only work for one round)~
Solution: make keep track of whether a party member is sick in their object. All the illnesses and diseases can be the same (i can make them different later if I want)


Since party members can get hurt and sick, we probably need medicine.
I'll add that to the Resources.

## Length of The Milky Way

~This is gonna be weird since I'm reducing an entire galaxy to a short trip. I should check to see how many light years it would take to travel across the Milky Way~
PFFFFF 100,000 YEARS AT THE SPEED OF LIGHT?! these aliens fast

"The Oregon Trail" had on average 12 rounds of decision-making, each representing 2 weeks, according to Wikipedia. That makes 168 days (about 5 months), so these aliens will have to travel just over *595 light years a day*.

There should also be an option to change the pace to go faster or slower. This should be a variable called pace:

- Grueling (fast)
- forgot the name (medium)
- (slow)

I'll make the amount of light years travelled a day depend on this variable. I'll make a function that decides how far they travel each day, and that function will change the value of a variable (distanceTraveledToday). Then this will be added to another variable that keeps track of the total distance travelled. After 2 weeks, if the total distance traveled is less than 100000 (the lenghth of the journey), another round starts.

so 2 variables:
- pace
- distance travelled today
- distance travelled in total

and 3 functions:
- randomizes distance travelled today
- checks if journey is finished
- starts another round of decision-making

This way the game will vary in length each time you play, and it also makes it a little easier to add Random Unfortunate Events that slow your progress.

## Random Unfortunate Events

Ideas for Random Unfortunate Events:
1. getting hit by an asteroid (damages spaceship, may injure someone, may kill someone)
2. getting stuck in an asteroid belt (slows you down because you have to dodge them, may result in 1.)
3. someone randomly gets sick or hurt (applies an illness that subtracts from health every day until death or until cured)
4. resources drift off the spaceship when someone left the door open (a resource besides money is subtracted from)
5. Space cow eats your food (lose random amount of food)
