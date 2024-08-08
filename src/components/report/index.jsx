import { Box, Button, Typography } from "@mui/material";
import MapReport from "../map";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { differenceInSeconds } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";

const mockData = [
  {
    id: 21,
    username: "caiords",
    anonymous: 0,
    type: "Ocorrência Não Listada",
    report: "QUATRO HOMENS NUMA MOTO",
    street: "rua maravilha",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-24T00:30:41.38-03:00",
    solved: 0,
    lat: "-22.8777019",
    lon: "-43.4575497",
  },
  {
    id: 20,
    username: "caiords",
    anonymous: 0,
    type: "Ocorrência Não Listada",
    report: "QUATRO HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T23:50:14.196-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 19,
    username: "caiords",
    anonymous: 0,
    type: "Ocorrência Não Listada",
    report: "QUATRO HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T23:32:45.857-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 18,
    username: "caiords",
    anonymous: 0,
    type: "Tráfico de Drogas",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T22:51:08.714-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 17,
    username: "caiords",
    anonymous: 0,
    type: "Perseguição",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T22:51:00.687-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 16,
    username: "caiords",
    anonymous: 0,
    type: "Furto",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T22:50:50.377-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 15,
    username: "caiords",
    anonymous: 0,
    type: "Furto",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-20T22:50:47.879-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 5,
    username: "caiords",
    anonymous: 0,
    type: "Outro Crime",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-04T01:58:43.233-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 4,
    username: "caiords",
    anonymous: 0,
    type: "Outro Crime",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua da usina",
    district: "bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-04T01:43:17.238-03:00",
    solved: 0,
    lat: "-22.8921655",
    lon: "-43.4547179",
  },
  {
    id: 3,
    username: "caiords",
    anonymous: 0,
    type: "Outro Crime",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua pedro de mello, 68",
    district: "Realengo",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-04T01:42:57.388-03:00",
    solved: 0,
    lat: "-22.8840131",
    lon: "-43.4435122",
  },
  {
    id: 2,
    username: "caiords",
    anonymous: 0,
    type: "Outro Crime",
    report: "TRÊS HOMENS NUMA MOTO",
    street: "rua pedro de mello, 68",
    district: "Realengo",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-04T01:14:38.836-03:00",
    solved: 0,
    lat: "-22.8840131",
    lon: "-43.4435122",
  },
  {
    id: 1,
    username: "caiords",
    anonymous: 0,
    type: "Outro Crime",
    report: "DOIS HOMENS NUMA MOTO",
    street: "Rua Oliveira Ribeiro, 1619",
    district: "Bangu",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-07-04T01:12:19.821-03:00",
    solved: 0,
    lat: "-22.8827893",
    lon: "-43.466438",
  },
];

export default function DisplayReports() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [report, setReport] = useState({});
  const columns = [
    {
      field: "type",
      headerName: "Ocorrência",
      width: 230,
      cell: "center",
      headerAlign: "center",
    },
    {
      field: "street",
      headerName: "Endereço",
      width: 350,
      cell: "center",
      headerAlign: "center",
    },
    {
      field: "district",
      headerName: "Bairro",
      width: 150,
      cell: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Data",
      type: "string",
      textAlign: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        const startDate = new Date(params.value);
        const endDate = new Date();
        return calculateTimeDifference(startDate, endDate);
      },
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 20,
    p: 4,
  };

  function calculateTimeDifference(startDate, endDate) {
    let diffInSeconds = differenceInSeconds(endDate, startDate);
    const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
    diffInSeconds -= diffInDays * 3600 * 24;

    const diffInHours = Math.floor(diffInSeconds / 3600);
    diffInSeconds -= diffInHours * 3600;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    diffInSeconds -= diffInMinutes * 60;

    const parts = [];
    if (diffInDays > 0) parts.push(`${diffInDays}d`);
    if (diffInHours > 0) parts.push(`${diffInHours}h`);
    if (diffInMinutes > 0) parts.push(`${diffInMinutes}m`);
    if (diffInSeconds > 0) parts.push(`${diffInSeconds}s`);

    return parts.join(", ");
  }

  return (
    <Box
      width={"100%"}
      className={"flexColumn"}
      rowGap={"10px"}
      sx={{
        filter: open ? "blur(5px)" : "none",
        overflow: "auto",
        marginTop: "50px",
      }}
    >
      <div style={{ height: 400, width: "50%" }}>
        <DataGrid
          rows={mockData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          onRowClick={(row) => {
            setReport(row.row);
            handleOpen();
          }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={"flexColumn"}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {report.type}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {report.report}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {report.street}, {report.district}, {report.city} - {report.state}
          </Typography>
          <Typography id="modal-modal-details" sx={{ mt: 2 }}>
            {report.created_at} by:{" "}
            {report.anonymous ? "Anônimo" : report.username}
          </Typography>
          <MapReport report={report} />
          <Button variant="contained" onClick={handleClose}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
