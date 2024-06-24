import random

alphabets = [chr(i) for i in range(65,91)] + [chr(i) for i in range(97, 123)]
numbers = [str(i) for i in range(0,10)]
symbols = ['!','#', '$', '%', '&', '*', '+', '?', '@']

def generatePassword(char, number, symbol):
    random_values = []
    for i in range(0, char):
        random_values.append(random.choice(alphabets))
    for i in range(0, symbol):
        random_values.append(random.choice(symbols))
    for i in range(0, number):
        random_values.append(random.choice(numbers))
    
    random.shuffle(random_values)
    shuffled_values = ''
    
    for char in random_values:
        shuffled_values += char 
    
    return shuffled_values
    
        
    

def passwordGenerator():
    chars = int(input('Enter how many characters you want in your password: '))
    numbers = int(input('Enter how many numbers you want in your password: '))
    symbols = int(input('Enter how many symbols you want in your password: '))
    regenerate = True
    
    
    while regenerate:
        password = generatePassword(chars, numbers, symbols)
        print(f"this is the generated password: {password}\n")
        try_again = input("Do you want to try again? Y or N :")
        
        if try_again.lower() == 'n':
            regenerate = False
            
passwordGenerator()
    



