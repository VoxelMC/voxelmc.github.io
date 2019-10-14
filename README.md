# [voxelmc.github.io](https://voxelmc.github.io)
 School Project

## How do you use this website?
First, you provide the first 2 fields called p and q with fairly large prime numbers. (Be careful, I have only tested up to 3 digits)
Then, click generate. This will give you a pair of numbers with which a message can be encrypted called a lock, and a pair of numbers to decrypt a message encrypted by your lock called a key.
The program will also insert these values into the appropriate fields below it.
Then you can encrypt a message by putting it in the field provided using the `Encrypt` button, and decrypt a message using the `Decrypt` button. You can watch it encrypt then decrypt your message back by clicking `Do Both`.

Have fun! Give out your lock, and keep your key private! Try giving your friends encoded messages, and have them send some back at you. It's a legitimate way of encryption!

WARNING: If your N value comes out to be 10 (eg. p = 2 and q = 5) you will probably have some issues. Otherwise, you should be good.