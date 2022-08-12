import random

game_choices = ["Rock", "Paper", "Scissors"]
player = False
computer_score = 0
player_score = 0
while True:
    computer_choice = random.choice(game_choices)
    player_input = input("Enter Rock Paper Scissor> ").capitalize()
    if computer_choice == player_input:
        print("It's a tie enter again!!")
    elif player_input == "Rock":
        if computer_choice == "Scissor":
            print("You won 'rock beat scissor'!!!")
            player_score += 1
        else:
            print("You lose computer won ")
            computer_score += 1
    elif player_input == "Paper":
        if computer_choice == "Scissor":
            print("You won 'Paper beat scissor!")
            player_score += 1
        else:
            print("You lose")
            computer_score += 1
    elif player_input == "Scissor":
        if computer_choice == "Rock":
            print("You lose 'rock beat scissor'!!")
            computer_score += 1
        else:
            print("You won computer looses!")
            player_score += 1
    elif player_input == 'End':
        print("Final Scores:")
        print(f"CPU:{computer_score}")
        print(f"Player:{player_score}")
        break