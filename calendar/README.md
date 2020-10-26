### Calendar Utilities
Go [here](https://brihat-rb.github.io/calendar/age_date_converter.html)  

#### AD/BS Date Converter
Utility that shows corresponding AD/BS Date for given BS/AD Date.

```
Valid Range: BS: 1975 Baisakh 1, Sanibar - 2100 Chaitra 31, Sukrabar
             AD: 1918 April 13, Saturday - 2044 April 15, Friday
```

#### Date Calculator
Adds or subtracts ``#years``, ``#months``, ``#days`` from given AD/BS Date
For BS Date Calculator, the input and result should be in valid range of ``1975 Baisakh 1, Sanibar - 2100 Chaitra 31, Sukrabar``

#### Age Calculator
Calculates current age from your birthdate given. Can also be used to find date difference between two dates.
For BS Age Calculator, both dates should be within the range of ``[1975 Baisakh 1, Sanibar - 2100 Chaitra 31, Sukrabar]``

#### Events of the Day
Shows Day Events for the given BS Date
For ``BS 2070 - 2075``, Only Lunar Event is shown
For ``BS 2076 - 2077``, Equivalent Lunar Calendar Info is Shown along with major events of that day
Will soon integrate ``Solar NS Calendar`` as well
Further updates will be available for ``2078 BS`` soon

### Python Converter Script
- ``ad_bs_converter.py``

   Usage:
   ```
   $ python ad_bs_converter.py [type] [year] [month] [date]

   valid [type]: to_bs | to_ad
   valid range [year] [month] [date]: FROM 1918 4 13 TO 2044 4 15 (AD)
                                      FROM 1975 1 1 TO 2100 12 31 (BS)
   ```
