import db from "../../middlewares/dbconn.js";
import { validateuser } from "../../utils/myfunctions.js";

export default class Expensesmodel {
    constructor() {

    }

    async addtags() {

    }

    async addCategory() {

    }

    async gettags(userid) {
        try {
            let result = await db.query(
                "SELECT id, tag_name FROM base_tags WHERE userid IN (0, $1)",
                [userid]
            );
            console.log(result.rows);
            if (result.rows.length > 0) {
                return { "success": true, "data": result.rows, "msg": "Data retrieved successfully" };
            }
            else {
                return { "success": true, "data": [], "msg": "No Data Found" };
            }
        }
        catch (err) {
            console.log(err);
            return { "success": false, "msg": "Something Failed, please try again later" };
        }
    }

    async getcategories(userid) {
        console.log('get categories model');
        try {
            let result = await db.query(
                "SELECT id, category_name FROM base_categories WHERE userid IN (0, $1)",
                [userid]
            );
            console.log(result.rows);
            if (result.rows.length > 0) {
                return { "success": true, "data": result.rows, "msg": "Data retrieved successfully" };
            }
            else {
                return { "success": true, "data": [], "msg": "No Data Found" };
            }
        }
        catch (err) {
            console.log(err);
            return { "success": false, "msg": "Something Failed, please try again later" };
        }
    }

    async addExpense(userid, name, amount, category, tags, edate) {
        console.log('in add Expense model');
        let retobj = { "success": false, insertId: 0, msg: "" };
        try {
            let user = await validateuser(userid);
            tags = tags.join(',');
            console.log(tags);
            console.log('user is', userid);
            console.log(user);
            if (user) {
                let result = await db.query(
                    `INSERT INTO base_expenses (userid, name, amount, category, tags, date, createdon, modifiedon)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
                    [userid, name, amount, category, tags, edate, new Date(), new Date()]
                );
                console.log(result.rows);
                if (result.rows.length > 0) {
                    let insertid = result.rows[0]['id'];
                    retobj["msg"] = "Expense Added Successfully";
                    retobj["success"] = true;
                    retobj["data"] = insertid;
                    return retobj;
                }
                else {
                    retobj["msg"] = "Something failed, please try again later";
                    retobj["success"] = false;
                    retobj["data"] = -1;
                    return retobj;
                }
            }
            else {
                retobj["msg"] = "User not found";
                retobj["success"] = false;
                retobj["data"] = -1;
                console.log(retobj);
                return retobj;
            }
        }
        catch (err) {
            retobj["msg"] = "Something failed, please try again later";
            retobj["success"] = false;
            retobj["data"] = -1;
            console.log(err);
            return retobj;
        }
    }

    async getdaywiseExpenses(userid, fromdate, todate, categories, tags) {
        try {
            console.log('in get daywise expenses Model');
            let variables = [userid];
            let idx = 2; // $1 is userid

            let categorycond = '';
            if (categories) {
                categorycond = ` AND be.category = $${idx++} `;
                variables.push(categories);
            }

            let tagcond = '';
            if (tags && tags.length > 0) {
                // PostgreSQL equivalent of find_in_set: check if bt.id is in the comma-separated tags string
                tagcond = ` AND bt.id = ANY(string_to_array(be.tags, ',')::int[]) AND bt.id = ANY($${idx++}::int[]) `;
                variables.push(tags);
            }

            let fromdatecond = '';
            if (fromdate) {
                fromdatecond = ` AND be.date::date >= $${idx++} `;
                variables.push(fromdate);
            }

            let todatecond = '';
            if (todate) {
                todatecond = ` AND be.date::date <= $${idx++} `;
                variables.push(todate);
            }

            let result = await db.query(
                `SELECT t.fdate, SUM(t.amount) AS expense
                 FROM (
                     SELECT be.date::date AS fdate, SUM(be.amount) AS amount
                     FROM base_expenses be
                     JOIN base_categories bc ON bc.id = be.category
                     CROSS JOIN base_tags bt
                     WHERE bt.id = ANY(string_to_array(be.tags, ',')::int[])
                       AND be.userid = $1
                       ${categorycond} ${tagcond} ${fromdatecond} ${todatecond}
                     GROUP BY be.date::date
                 ) t
                 GROUP BY t.fdate
                 ORDER BY t.fdate ASC`,
                variables
            );
            return result.rows;
        }
        catch (err) {
            console.log(err);
        }
    }

    async gettagwiseExpenses(userid, fromdate, todate, categories, tags) {
        try {
            console.log('in get tag expenses Model');
            let variables = [userid];
            let idx = 2;

            // category filter is intentionally disabled (1==0 check preserved as comments)
            let tagcond = '';
            if (tags && tags.length > 0) {
                tagcond = ` AND bt.id = ANY($${idx++}::int[]) `;
                variables.push(tags);
            }

            let fromdatecond = '';
            if (fromdate) {
                fromdatecond = ` AND be.date::date >= $${idx++} `;
                variables.push(fromdate);
            }

            let todatecond = '';
            if (todate) {
                todatecond = ` AND be.date::date <= $${idx++} `;
                variables.push(todate);
            }

            let result = await db.query(
                `SELECT bt.id, bt.tag_name, SUM(be.amount) AS amount
                 FROM base_expenses be
                 JOIN base_categories bc ON bc.id = be.category
                 CROSS JOIN base_tags bt
                 WHERE bt.id = ANY(string_to_array(be.tags, ',')::int[])
                   AND be.userid = $1
                   ${tagcond} ${fromdatecond} ${todatecond}
                 GROUP BY bt.id, bt.tag_name`,
                variables
            );
            return result.rows;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getcategorywiseExpenses(userid, fromdate, todate, categories, tags) {
        try {
            console.log('in get category expenses Model');
            let variables = [userid];
            let idx = 2;

            let categorycond = '';
            if (categories) {
                categorycond = ` AND be.category = $${idx++} `;
                variables.push(categories);
            }

            let fromdatecond = '';
            if (fromdate) {
                fromdatecond = ` AND be.date::date >= $${idx++} `;
                variables.push(fromdate);
            }

            let todatecond = '';
            if (todate) {
                todatecond = ` AND be.date::date <= $${idx++} `;
                variables.push(todate);
            }

            let result = await db.query(
                `SELECT bc.id, bc.category_name, SUM(be.amount) AS amount
                 FROM base_expenses be
                 JOIN base_categories bc ON bc.id = be.category
                 WHERE be.userid = $1
                   ${categorycond} ${fromdatecond} ${todatecond}
                 GROUP BY bc.id, bc.category_name`,
                variables
            );
            return result.rows;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getuserExpenses(userid, start, limit, categories, tags, fromdate, todate) {
        try {
            console.log('in get user expenses model');
            let variables = [userid];
            let idx = 2;

            let categorycond = '';
            if (categories) {
                categorycond = ` AND be.category = $${idx++} `;
                variables.push(categories);
            }

            let tagcond = '';
            if (tags && tags.length > 0) {
                tagcond = ` AND bt.id = ANY($${idx++}::int[]) `;
                variables.push(tags);
            }

            let fromdatecond = '';
            if (fromdate) {
                fromdatecond = ` AND be.date::date >= $${idx++} `;
                variables.push(fromdate);
            }

            let todatecond = '';
            if (todate) {
                todatecond = ` AND be.date::date <= $${idx++} `;
                variables.push(todate);
            }

            variables.push(limit);
            const limitIdx = idx++;
            variables.push(start);
            const offsetIdx = idx++;

            let result = await db.query(
                `SELECT be.*, bc.category_name, string_agg(bt.tag_name, ',') AS tag_names
                 FROM base_expenses be
                 JOIN base_categories bc ON bc.id = be.category
                 CROSS JOIN base_tags bt
                 WHERE bt.id = ANY(string_to_array(be.tags, ',')::int[])
                   AND be.userid = $1
                   ${categorycond} ${tagcond} ${fromdatecond} ${todatecond}
                group by be.id, bc.category_name
                 ORDER BY be.date DESC
                 LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
                variables
            );
            return result.rows;
        }
        catch (err) {
            console.log(err);
        }
    }
}