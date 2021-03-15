*** Test Cases ***
Test For Example 1
    FOR  ${x}  IN  '1'  '2'
        No Operation
    END

Test For Example 2
    FOR  ${x}  IN  '1'  '2'
        FOR  ${y}  IN  '2'
            No Operation
        END
    END

Test For Example 3
    FOR  ${x}  IN  '1'  '2'
        IF  {1 > 0}
            No Operation
        ELSE IF  {2 > 1}
            No Operation
        ELSE
            No Operation
        END
    END

Test IF Example 1
    IF  {1 > 0}
        No Operation
    END

Test IF Example 2
    IF  {1 > 0}
        No Operation
    ELSE
        No Operation
    END

Test IF Example 3
    IF  {1 > 0}
        No Operation
    ELSE IF  {2 > 1}
        No Operation
    END

Test IF Example 4
    IF  {1 > 0}
        No Operation
    ELSE IF  {2 > 1}
        No Operation
    ELSE
        No Operation
    END

Test IF Example 5
    IF  {1 > 0}
        IF  {1 > 0}
            No Operation
        END
    ELSE IF  {2 > 1}
        IF  {1 > 0}
            No Operation
        END
    ELSE
        IF  {1 > 0}
            No Operation
        END
    END

Test IF Example 6
    IF  {1 > 0}
        FOR  ${x}  IN  '1'  '2'
            No Operation
        END
    ELSE IF  {2 > 1}
        FOR  ${x}  IN  '1'  '2'
            No Operation
        END
    ELSE
        FOR  ${x}  IN  '1'  '2'
            No Operation
        END
    END
