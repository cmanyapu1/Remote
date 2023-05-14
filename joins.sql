-- write your queries here

select o.first_name, o.last_name, count(owner_id) as count, round(avg(price)) as average_price
from owners o
join vehicles V
on o.id = v.owner_id
group by (first_name, last_name)
having count(owner_id) > 1 AND round(avg(price)) > 10000
order by first_name desc