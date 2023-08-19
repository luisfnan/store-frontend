import { useEffect, useState, useMemo } from "react";
import { useTable, Column, Hooks } from "react-table";
import '../App.css'
import { getTableInfo } from "../services/getTableInfo";
import { putTableInfo } from "../services/putTableInfo";
import AddNew from "./AddNewBtn";



interface Info {
    url: String
}
interface Filtered {
    name1?: string;
    name2?: string;
}

interface Edit {
    rowIndex: number | null;
    editedValues: any;
}


function capitalizeFirstLetter(input: string): string {

    const firstLetter = input.charAt(0).toUpperCase();
    const restOfTheString = input.slice(1);

    return firstLetter + restOfTheString;
}

function MainTable(props: Info) {

    const [tableInfo, setTableInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editState, setEditState] = useState<Edit>({
        rowIndex: null,
        editedValues: {},
    });

    useEffect(() => {
        getTableInfo(props.url)
            .then((data) => {
                console.log('Categories: ', data)
                setTableInfo(data);
            }).catch(err => console.log(err));

    }, []);


    let valuesToBeFiltered: Filtered;

    if (props.url === 'products') {
        valuesToBeFiltered = { name1: 'supplierID', name2: 'category' }

    } else if (props.url === 'suppliers') {
        valuesToBeFiltered = { name1: ' ', name2: ' ' }
    } else if (props.url === 'profile') {
        valuesToBeFiltered = { name1: ' ', name2: 'password' }
    } else if (props.url === 'categories') {
        valuesToBeFiltered = { name1: ' ', name2: 'product' }
    } else {
        console.log(props.url, ": is not a vail endpoint")
    }








    let objectKeys: Column[] = []
    if (tableInfo[0]) {
        objectKeys = Object.keys(tableInfo[0]).filter((key) => key !== valuesToBeFiltered.name2).map((key) => {
            const upperCaseHeadder = capitalizeFirstLetter(key);

            return {
                Header: upperCaseHeadder,
                accessor: key,
            }
        });
    }



    //boton de edit
    const tableHooks = (hooks: Hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit",
                Header: "Edit",
                Cell: ({ row }) => (
                    <button className="rounded-full w-7 edit-btn" onClick={() => {

                        if (!isEditing) {
                            setIsEditing(true);
                            setEditState({
                                rowIndex: row.index,
                                editedValues: { ...row.original },
                            });
                        } else {
                            setIsEditing(false);
                            setEditState({
                                rowIndex: null,
                                editedValues: {},
                            });
                        }
                    }}> <img className="list-image-[url(checkmark.png)] " src="/edit.png" alt="edit" />
                    </button>
                ),
            },
        ]);
    };


    const bodyData = useMemo(() => [...tableInfo], [tableInfo])
    const columnData = useMemo(() => objectKeys, [tableInfo])


    const tableInstance = useTable({
        columns: columnData,
        data: bodyData
    }, tableHooks)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance





    return (

        <>
            <AddNew />
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
                            rows.map((row) => {
                                prepareRow(row)


                                return (
                                    <tr className={`border border-green-500 `}  {...row.getRowProps()} >
                                        {

                                            row.cells.map((cell, cellIndex) => {
                                                return (
                                                    <td className="border border-green-500 p-2" {...cell.getCellProps()} >

                                                        {editState.rowIndex === row.index && cellIndex !== row.cells.length - 1 ? (
                                                            <input type="text" className="input-box"
                                                                value={editState.editedValues[cell.column.id] || cell.value}
                                                                onChange={(e) =>
                                                                    setEditState({
                                                                        ...editState,
                                                                        editedValues: {
                                                                            ...editState.editedValues,
                                                                            [cell.column.id]: e.target.value,
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                        ) : (
                                                            cell.render("Cell")
                                                        )}

                                                        {cellIndex === row.cells.length - 1 && (
                                                            <button className="save-btn" onClick={() => {
                                                                putTableInfo(props.url, editState.editedValues)
                                                                setIsEditing(false);
                                                                setEditState({
                                                                    rowIndex: null,
                                                                    editedValues: {},
                                                                });

                                                            }}
                                                            >
                                                                <img className="list-image-[url(checkmark.png)] " src="/save.svg" alt="save" />
                                                            </button>
                                                        )}
                                                    </td>
                                                );
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

export default MainTable
