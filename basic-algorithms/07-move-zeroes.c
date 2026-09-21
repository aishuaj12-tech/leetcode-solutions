#include <stdio.h>

void moveZeroes(int* nums, int numsSize)
{
    int position = 0;

    for (int i = 0; i < numsSize; i++)
    {
        if (nums[i] != 0)
        {
            nums[position] = nums[i];
            position++;
        }
    }

    while (position < numsSize)
    {
        nums[position] = 0;
        position++;
    }
}

int main()
{
    int nums1[] = {0, 1, 0, 3, 12};
    int nums2[] = {0};

    moveZeroes(nums1, 5);
    moveZeroes(nums2, 1);

    printf("Test Case 1: ");

    for (int i = 0; i < 5; i++)
        printf("%d ", nums1[i]);

    printf("\n");

    printf("Test Case 2: ");

    for (int i = 0; i < 1; i++)
        printf("%d ", nums2[i]);

    printf("\n");

    return 0;
}