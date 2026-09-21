#include <stdio.h>

char* longestCommonPrefix(char** strs, int strsSize)
{
    static char result[201];

    if (strsSize == 0)
    {
        result[0] = '\0';
        return result;
    }

    int i = 0;

    while (strs[0][i] != '\0')
    {
        for (int j = 1; j < strsSize; j++)
        {
            if (strs[j][i] != strs[0][i])
            {
                result[i] = '\0';
                return result;
            }
        }

        result[i] = strs[0][i];
        i++;
    }

    result[i] = '\0';

    return result;
}

int main()
{
    char* strs1[] = {"flower", "flow", "flight"};
    char* strs2[] = {"dog", "racecar", "car"};

    printf("Test Case 1: %s\n", longestCommonPrefix(strs1, 3));
    printf("Test Case 2: %s\n", longestCommonPrefix(strs2, 3));

    return 0;
}