import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "@mui/material";
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery } from "../../state/api";
import { useMemo } from "react";
import BoxHeader from "../../components/BoxHeader";
const Row1 = () => {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();
  // console.log("🚀 ~ file: Row1.tsx:5 ~ Row1 ~ dḁta:", data);
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  const profitExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);
  return (
    <>
      <DashboardBox bgcolor={"#fff"} gridArea={"a"}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Track of full revenue vs expense for the year"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient
                id="colorRevenue"
                x1={"0"}
                x2={"0"}
                y1={"0"}
                y2={"1"}
              >
                <stop
                  offset={"5%"}
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset={"95%"}
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="colorExpenses"
                x1={"0"}
                x2={"0"}
                y1={"0"}
                y2={"1"}
              >
                <stop
                  offset={"5%"}
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset={"95%"}
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              style={{ fontSize: "10px", textTransform: "capitalize" }}
              tickLine={false}
              // axisLine={{strokeWidth : "0"}}
            />
            <YAxis
              tickLine={false}
              style={{ fontSize: "10px", textTransform: "capitalize" }}
              axisLine={{ strokeWidth: "0" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              fill="url(#colorRevenue)"
              dot={true}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.primary.main}
              fill="url(#colorExpenses)"
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor={"#fff"} gridArea={"b"}>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Track of full profit vs revenue for the year"
          sideText="+2.7%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={profitExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              style={{ fontSize: "10px", textTransform: "capitalize" }}
              tickLine={false}
              axisLine={{strokeWidth : "0"}}
            />
            <YAxis
              yAxisId={"left"}
              tickLine={false}
              style={{ fontSize: "10px", textTransform: "capitalize" }}
              axisLine={false}
            />
            <YAxis
              yAxisId={"right"}
              orientation="right"
              tickLine={false}
              style={{ fontSize: "10px", textTransform: "capitalize" }}
              axisLine={false}
            />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
              fontSize={"10px"}
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
              }
            />
            <Tooltip />
            <Line
              dataKey={"profit"}
              type={"monotone"}
              yAxisId={"left"}
              stroke={palette.tertiary[500]}
            />
            <Line
              dataKey={"revenue"}
              type={"monotone"}
              yAxisId={"right"}
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>z
      </DashboardBox>
      <DashboardBox bgcolor={"#fff"} gridArea={"c"}>
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Graph representing the revenue month by month"
          sideText="+3%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px", textTransform: "capitalize" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
