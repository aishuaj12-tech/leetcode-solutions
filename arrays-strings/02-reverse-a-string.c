#include <stdio.h>

void reverseString(char* s, int sSize)
{
    int left = 0;
    int right = sSize - 1;

    while (left < right)
    {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        left++;
        right--;
    }
}

int main()
{
    char str1[] = "hello";

    reverseString(str1, 5);

    printf("Test Case 1: %s\n", str1);

    char str2[] = "a";

    reverseString(str2, 1);

    printf("Test Case 2: %s\n", str2);

    return 0;
}