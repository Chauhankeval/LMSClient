import { Button } from "@/components/ui/button";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetAllAdminCourseQuery } from "@/Features/api/courseApi";
import Chip from "@mui/material/Chip";
import { Edit } from "lucide-react";
const CourseTable = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllAdminCourseQuery();

  if (isLoading) return <h1>Loading......</h1>;

  console.log("<<<DAta", data);

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new course</Button>
      <div>
        <Table>
          <TableCaption>A list of your recent Courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell className="font-medium">
                  {item?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  {item?.isPublished ? (
                    <Chip label="Published" color="success" />
                  ) : (
                    <Chip label="UnPublished" color="error" />
                  )}
                </TableCell>
                <TableCell>{item?.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={()=> navigate(`${item?._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
