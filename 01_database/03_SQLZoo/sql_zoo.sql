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

--Show the name and capital where the name and the capital have the same number of characters.
SELECT name, capital FROM world WHERE LENGTH(name) = LENGTH(capital);

--Show the name and the capital where the first letters of each match. Don't include countries where the name and the capital are the same word.
SELECT name, capital
FROM world WHERE LEFT(name,1) = LEFT(capital, 1) AND name <> capital;

--Find the country that has all the vowels and no spaces in its name.
SELECT name FROM world
WHERE
name LIKE '%a%' AND
name LIKE '%e%' AND
name LIKE '%i%' AND
name LIKE '%o%' AND
name LIKE '%u%' AND

name NOT LIKE '% %';

--Change the query shown so that it displays Nobel prizes for 1950.

SELECT yr, subject, winner
  FROM nobel
 WHERE yr = 1950

 --Show who won the 1962 prize for literature.
 SELECT winner
  FROM nobel
 WHERE yr = 1962
   AND subject = 'literature'

--Show the year and subject that won 'Albert Einstein' his prize.

SELECT yr, subject FROM nobel WHERE winner = 'Albert Einstein';

--Give the name of the 'peace' winners since the year 2000, including 2000.
SELECT winner FROM nobel WHERE subject = 'Peace' AND yr >= 2000;

--Show all details (yr, subject, winner) of the literature prize winners for 1980 to 1989 inclusive.
SELECT yr, subject, winner FROM nobel WHERE subject = 'literature' AND yr  BETWEEN 1980 AND 1989;

--Show all details of the presidential winners:Theodore Roosevelt Thomas Woodrow WilsonJimmy Carter Barack Obama
SELECT * FROM nobel WHERE winner IN ('Theodore Roosevelt', 'Thomas Woodrow Wilson', 'Jimmy Carter', 
'Barack Obama');

--Show the winners with first name John
SELECT winner FROM nobel WHERE winner LIKE 'John %';

--Show the year, subject, and name of physics winners for 1980 together with the chemistry winners for 1984.
SELECT yr, subject, winner FROM nobel WHERE
(subject = 'Physics' AND yr = 1980 ) OR ( subject = 'chemistry' AND yr= 1984 );

--Show the year, subject, and name of winners for 1980 excluding chemistry and medicine
SELECT * FROM nobel WHERE yr = 1980 AND subject NOT IN ('chemistry', 'medicine');

--Show year, subject, and name of people who won a 'Medicine' prize in an early year (before 1910, not including 1910) together with winners of a 'Literature' prize in a later year (after 2004, including 2004)
SELECT yr, subject, winner FROM nobel WHERE 
(subject = 'medicine' AND yr < 1910) OR ( subject = 'Literature' AND yr >= 2004);