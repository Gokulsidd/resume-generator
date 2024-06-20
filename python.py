import random

def rockPaperScissor():
    options = ['rock', 'paper', 'scissor']
    play = True
    
    while play:
        user_input = input('0 for rock , 1 for paper , 2 for scissor or Enter Space to end the game\nyour choice: ')
        print(type(user_input) == '0')
        
                
        if user_input == " ":
            play = False
            print("End Game")
        elif user_input != '0' or user_input != '1' or user_input != '2':
            print('Invalid Input . Enter number between 0 to 2')
        else:
            computer_choice = random.choice(options)
            user_choice = options[int(user_input)]
            
            if (computer_choice == 'rock' and user_choice == 'paper') or (computer_choice == 'paper' and user_choice == 'scissor') or (computer_choice == 'scissor' and user_choice == 'rock'):
                print(f'computer: {computer_choice}\nyou: {user_choice}\n\nYou Win !!')
            elif computer_choice == user_choice:
                print(f'computer: {computer_choice}\nyou: {user_choice}\n\nIts a Tie !!')
            else:
                print(f'computer: {computer_choice}\nyou: {user_choice}\n\nYou lose !!')

rockPaperScissor()

        



    
