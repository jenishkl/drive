import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import {BiSortAlt2} from 'react-icons/bi'
import '../../pages/Settings/ConfigureRoles/configure.css'
import { IoSearch } from "react-icons/io5";

const CommonReactTable = ({
  data,
  columns,
  pagination,
  noData,
  searchFields,
  striped=true
}) => {
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#F7F7F7",
                fontSize: "16px !important",
                color: "#404040",
                fontWeight: "600",
            },
        },
        rows: {
            style: {
                fontSize: "15px",
                fontWeight: "500",
                border:'none !important'
            },
            stripedStyle: {
                backgroundColor: "#E3E9FF",
              }
        },
        headCells: {
            style: {
                borderRight: "1px solid #00000040",
                padding:'18px',
                justifyContent:'center'
            },
        },
       
    };
       
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");                     
  const [filteredData, setFilteredData] = useState(data);               

  useEffect(() => {
    if(searchFields){
        const filtered = data.filter((item) =>
        searchFields.some((field) =>
          item[field].toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    else{
        setFilteredData(data)
    }
  }, [searchTerm, data, searchFields]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  return (
    <div >
      {searchFields &&<div className="react-table-search-container">
      <div className=' table-menu table-search-input'>
                <div className="dropdown-toggle d-flex justify-content-around p-2 align-items-center" type="button"
                  id="dropdownMenuNewProfile" data-bs-toggle="dropdown"
                  aria-expanded="false">
                    <IoSearch className="mr-2" />
                  <h5 className="m-0 ">Search in Queries</h5> 
                </div>
                <ul className="dropdown-menu roles-dropdown-options p-0"
                  aria-labelledby="dropdownMenuNewProfile">
                  <input
        type="text"
        
        value={searchTerm}
        className="form-control "
        onChange={handleSearch}
      />


                </ul>
              </div>
       
      </div> }
      <div className="data-table-container">
      <DataTable
        data={filteredData}
        columns={columns}
        pagination={pagination}
        customStyles={customStyles}
        noHeader={false}
        striped={striped}
        noDataComponent={noData}
        highlightOnHover={true}
        fixedHeader={true}
        onPageChange={handlePageChange}
        sortIcon={<BiSortAlt2/>}
        paginationServer // Enable server-side pagination
        paginationPerPage={10} // Number of items per page
        paginationTotalRows={filteredData.length} // Total rows for pagination
        paginationDefaultPage={currentPage} // Set the default page
      />
      </div>
    </div>
  );
};

export default CommonReactTable;
