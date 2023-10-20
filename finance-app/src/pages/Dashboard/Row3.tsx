import { Box, useTheme, Typography } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import DashboardBox from "../../components/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/api";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const productColumn = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expenses",
      headerName: "Expenses",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  const transactionColumn = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer Name",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const pieData = useMemo(() => {
    if (kpiData) {
      const totalExpenseData = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of total`,
              value: totalExpenseData - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
  console.log("Pie Data :", pieData);
  return (
    <>
      <DashboardBox gridArea={"g"}>
        <BoxHeader
          title="List of Poducts"
          subtitle=""
          sideText={`${productData?.length} products`}
        />
        <Box
          mt={"0.5rem"}
          p={"0 0.5rem"}
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumn}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea={"h"}>
        <BoxHeader
          title="Recent Orders"
          subtitle=""
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt={"0.5rem"}
          p={"0 0.5rem"}
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumn}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieData?.map((data, i) => (
            <Box
              key={`${data[0].name}-${i}`}
              display={"flex"}
              flexDirection="column"
              alignItems="center"
              width="100%"
              maxWidth="150px"
            >
              <PieChart
                width={110}
                height={100}
                style={{
                  marginBottom: "0.2rem",
                }}
              >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea={"j"}>
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
          subtitle=""
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[500]}
            borderRadius="1rem"
            width="60%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Provides comprehensive insights into product expenses and recent
          transactions, facilitating effective budget allocation and financial
          planning. Offers a detailed breakdown of expenses by category,
          enabling a clear understanding of spending patterns. Empowers
          data-driven decision-making through in-depth analysis of product
          performance and transaction trends.
        </Typography>
      </DashboardBox>
    </>
  );
};
export default Row3;
