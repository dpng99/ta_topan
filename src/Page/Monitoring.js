import React,{useState, useEffect} from 'react'
import { Container, Dropdown, Row,Col, Card, Table} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport,Search  } from 'react-bootstrap-table2-toolkit';


const Monitoring = () => {
    const [DataSet, setDataSet] = useState('')
    const [ DataKey, setDataKey] = useState('')
    const [currentIndex, setCurrentIndex] = useState('')
    const [currentIndex2, setCurrentIndex2] = useState('')
    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;
  


    const settDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiDebit').child(index).child('Submitted').val()
           const currentIndex = []
            for(let id in DataBinning) {
                    currentIndex.push(DataBinning[id])      
            }
            setCurrentIndex(currentIndex)
            console.log(currentIndex)

        })
        
        
        
    }
    const settingDataEdit = (index) => {
        
        const dataBind = CRUDHandler.getMonitor()
        dataBind.on('value', (snapshot) => {
            const DataBinning = snapshot.child('LokasiQuality').child(index).child('Submitted').val()
           const currentIndex2 = []
 
            for(let id in DataBinning) {
                    currentIndex2.push(DataBinning[id])
               
            }
            setCurrentIndex2(currentIndex2)
          
      
        })
        
        
        
    }
 
     
  
    useEffect(() => {
        const enumerate = CRUDHandler.getLocation()
        
        enumerate.on('value', (snapshot) => {
            const dataSnip = snapshot.child('LokasiDebit').val();
            const dataSnip2 = snapshot.child('LokasiQuality').val();
            const DataSet = [];
            const DataKey = [];
            for(let id in dataSnip) {
                DataSet.push(dataSnip[id])
            }
            for(let id in dataSnip2) {
                DataKey.push(dataSnip2[id])
            }
        
            setDataSet(DataSet)
            setDataKey(DataKey)
            
            
        })
        
      
     

    }, [])
   
    const columns = [{
      dataField: 'id' ,
      text: 'Nomor', 

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true
    }, {
      dataField: 'sumur',
      text: 'Sumur',
      sort: true
    }, {
      dataField: 'date',
      text: 'Tanggal',
      sort: true
    }, {
      dataField: 'time',
      text: 'Waktu',
      sort: true
    }, {
      dataField: 'temperature',
      text: 'Suhu',
      sort: true
    }, {
      dataField: 'ph',
      text: 'PH',
      sort: true
    }, {
      dataField: 'tds',
      text: 'TDS',
      sort: true
    }, {
      dataField: 'orp',
      text: 'ORP',
      sort: true
    }
  ];
  const defaultSort = [{
      dataField: 'id.no',
      order: 'asc'
  }]
  const columns2 = [{
    dataField: 'id.no' ,
    text: 'Nomor', 
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
    sort: true
  }, {
      dataField: 'pipa',
      text: 'Pipa',
      sort: true
    }, {
      dataField: 'date',
      text: 'Tanggal',
      sort: true
    }, {
      dataField: 'time',
      text: 'Waktu',
      sort: true
    }, {
      dataField: 'temperature',
      text: 'Suhu',
      sort: true
    }, {
      dataField: 'flowrate',
      text: 'Flowrate',
      sort: true
    }, {
      dataField: 'fss',
      text: 'FSS',
      sort: true
    }, {
      dataField: 'velocity',
      text: 'Velocity',
      sort: true
    }
    , {
      dataField: 'flowestimasi',
      text: 'Flowestimasi',
      sort: true
    }
  ];
  const defaultSort2 = [{
      dataField: 'date',
      order: 'asc'
  },{
      dataField: 'pipa',
      order: 'asc'
  },{
      dataField: 'time',
      order: 'asc'
  },{
      dataField: 'temperature',
      order: 'asc'
  },{
      dataField: 'flowrate',
      order: 'asc'
  },{
      dataField: 'fss',
      order: 'asc'
  },{
      dataField: 'velocity',
      order: 'asc'
  },{
      dataField: 'flowestimasi',
      order: 'asc'
  }]
    
    return (
        <>
        <Navbarx/>
        <Container >
    <Card className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
        <Container className="d-flex align-content-start justify-content-start position-relative ">
        <h1 className="fs-3 text">Portable Monitoring</h1> 
        </Container>
   <Container fluid className="d-flex align-content-end justify-content-end">
            <Dropdown fluid >
            <Dropdown.Toggle  variant="primary" id="dropdown-basic" className="m-1">
             Lokasi Debit
             </Dropdown.Toggle>

         <Dropdown.Menu >
             {Object.keys(DataSet).map((item) => (
             <Dropdown.Item key={item} onClick={() => settDataEdit(DataSet[item].nama)
            }>
                {DataSet[item].nama}
                </Dropdown.Item>
         ))}
        </Dropdown.Menu>
        </Dropdown>
        
       
        </Container>
        <BootstrapTable bootstrap4 keyField='id.no' data={ currentIndex } columns={ columns2 }  defaultSorted={defaultSort2} pagination={ paginationFactory() } />
                     
         <Container fluid className="d-flex align-content-end justify-content-end ">
            <Dropdown fluid  >
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="m-1 align-self-end" >
             Lokasi Quality
             </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Object.keys(DataKey).map((item) => (
                        <Dropdown.Item key={item} onClick={() => settingDataEdit(DataKey[item].nama)
                        } >{DataKey[item].nama}</Dropdown.Item>
                    ))}
                
                </Dropdown.Menu>
                </Dropdown>
                </Container>
             
         { currentIndex2 ?           
  <ToolkitProvider
  keyField="id"
  data={ currentIndex2 }
  columns={ columns }
  defaultSorted={defaultSort} 
  pagination={ paginationFactory() }
  search
  exportCSV
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable { ...props.baseProps } />
      </div>
    )
  }
</ToolkitProvider>
: null}

                </Card>
                </Container>
                </>
    )
}

export default Monitoring
