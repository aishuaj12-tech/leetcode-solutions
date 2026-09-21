#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isAnagram(char* s, char* t)
{
    int count[256] = {0};

    if (strlen(s) != strlen(t))
        return false;

    for (int i = 0; s[i] != '\0'; i++)
    {
        count[(unsigned char)s[i]]++;
        count[(unsigned char)t[i]]--;
    }

    for (int i = 0; i < 256; i++)
    {
        if (count[i] != 0)
            return false;
    }

    return true;
}

int main()
{
    printf("Test Case 1: %d\n", isAnagram("anagram", "nagaram"));
    printf("Test Case 2: %d\n", isAnagram("a", "ab"));

    return 0;
}