import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, Column, Hooks } from "react-table";
import '../App.css'
import { Link } from 'react-router-dom';





function Categories() {

    const [categories, setCategories] = useState([])

    async function getData() {
        const response = await axios.get('https://store-api-l9ki.onrender.com/api/categories')
            .catch(err => console.log(err));

        if (response) {
            const info = response.data;
            console.log('Categories: ', info)
            setCategories(info);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    let objectKeys: Column[] = []
    if (categories[0]) {
        objectKeys = Object.keys(categories[0]).filter((key) => key !== "product").map((key) => {
            return {
                Header: key,
                accessor: key,
            }
        });
    }
    const tableHooks = (hooks: Hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }) => (
                    <button className="rounded-full w-7" onClick={() => alert("Editing: " + row.values.price)}>
                        <img className="list-image-[url(checkmark.png)] " src="/edit.png" alt="edit" />
                    </button>
                ),
            },
        ]);
    };


    const categoryData = useMemo(() => [...categories], [categories])
    const categoryColumn = useMemo(() => objectKeys, [categories])


    const tableInstance = useTable({
        columns: categoryColumn,
        data: categoryData
    }, tableHooks)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    const isEeven = (idx: number) => idx % 2 === 0;



    return (
        <>
            <header>
                <h1>CATEGORIES</h1>
            </header>

            <nav className="flex sm:justify-center space-x-4">
                {[
                    ['Clients', '/clients'],
                    ['Suppliers', '/suppliers'],
                    ['Categories', '/categories'],
                    ['Products', '/products'],
                ].map(([title, url]) => (
                    <Link to={url}>  <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a></Link>
                ))}

            </nav>

            <nav className="flex sm:justify-center space-x-4 edit">

                <a href='/edit' className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Add New</a>
            </nav>




            <div className="containerr">

                <table className="table-fixed text-base text-gray-900" {...getTableProps()}>

                    <thead className="p-2">
                        {
                            headerGroups.map((headerGroup) => (
                                <tr className="border border-green-500"{...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            <th className="border border-green-500 p-2" {...column.getHeaderProps()}>
                                                {
                                                    column.render('Header')
                                                }
                                            </th>
                                        ))}
                                </tr>
                            ))}
                    </thead>

                    <tbody className="border border-green-500 p-2" {...getTableBodyProps()}>
                        {
                            rows.map((row, idx) => {
                                prepareRow(row)
                                const isItEven = isEeven(idx) ? `bg-green-400 bg opacity-80` : ``

                                return (
                                    <tr className={`border border-green-500 ${isItEven}`}  {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return <td className="border border-green-500 p-2"{...cell.getCellProps()}>{cell.render('Cell')} </td>
                                            })
                                        }
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>


            </div>

        </>
    )

}

export default Categories
