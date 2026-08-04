var findKthPositive = function(arr, k) {
    let current = 1;

    for (let num of arr) {
        while (current < num) {
            k--;

            if (k === 0) {
                return current;
            }

            current++;
        }

        current++;
    }

    return current + k - 1;
};

console.log(findKthPositive([2,3,4,7,11], 5));