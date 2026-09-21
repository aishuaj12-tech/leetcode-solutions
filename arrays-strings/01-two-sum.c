#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize)
{
    int* result = (int*)malloc(2 * sizeof(int));

    for (int i = 0; i < numsSize; i++)
    {
        for (int j = i + 1; j < numsSize; j++)
        {
            if (nums[i] + nums[j] == target)
            {
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }

    *returnSize = 0;
    free(result);
    return NULL;
}

int main()
{
    // Test Case 1 - Typical case
    int nums1[] = {2, 7, 11, 15};
    int target1 = 9;
    int returnSize1;

    int* answer1 = twoSum(nums1, 4, target1, &returnSize1);

    printf("Test Case 1: [%d, %d]\n", answer1[0], answer1[1]);
    free(answer1);

    // Test Case 2 - Edge case
    int nums2[] = {3, 3};
    int target2 = 6;
    int returnSize2;

    int* answer2 = twoSum(nums2, 2, target2, &returnSize2);

    printf("Test Case 2: [%d, %d]\n", answer2[0], answer2[1]);
    free(answer2);

    return 0;
}