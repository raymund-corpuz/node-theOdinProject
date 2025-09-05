--Modify it to show the population of Germany
SELECT population FROM world WHERE name = 'Germany';

--Show the name and the population for 'Sweden', 'Norway' and 'Denmark'.
SELECT name, population FROM world WHERE name IN ('Sweden', 'Norway', 'Denmark');

--Which countries are not too small and not too big? BETWEEN allows range checking (range specified is inclusive of boundary values).
SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000

--Observe the result of running this SQL command to show the name, continent and population of all countries
SELECT name, continent, population FROM world;

-- Show the name for the countries that have a population of at least 200 million. 200 million is 200000000, there are eight zeros.
SELECT name FROM world
WHERE population >= 200000000

--Give the name and the per capita GDP for those countries with a population of at least 200 million.
SELECT name, gdp/population FROM world WHERE population > 200000000;

--Show the name and population in millions for the countries of the continent 'South America'. Divide the population by 1000000 to get population in millions.
SELECT name, population/1000000 FROM world WHERE continent = 'South America' 

--Show the name and population for France, Germany, Italy
SELECT name, population FROM world WHERE name IN ('France', 'Germany', 'Italy');

--Show the countries which have a name that includes the word 'United'
SELECT name FROM world WHERE name LIKE '%United%';

--Show the countries that are big by area or big by population. Show name, population and area.
SELECT name, population, area
FROM world 
WHERE area > 3000000 
OR population > 250000000

--Exclusive OR (XOR). Show the countries that are big by area (more than 3 million) or big by population (more than 250 million) but not both. Show name, population and area.
SELECT name, population, area
  FROM world
  WHERE (population > 250000000) XOR (area > 3000000);

--For Americas show population in millions and GDP in billions both to 2 decimal places.
  SELECT
    name,
    ROUND(population / 1000000, 2) AS population_in_millions,
    ROUND(GDP / 1000000000, 2) AS gdp_in_billions
FROM
    world
WHERE
    continent = 'South America';

--Show per-capita GDP for the trillion dollar countries to the nearest $1000.
Select name ,
       ROUND(gdp/population, -3)
from world
where gdp >= 1000000000000