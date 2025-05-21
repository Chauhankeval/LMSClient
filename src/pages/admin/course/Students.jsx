import React, { useState } from "react";
import {
  useDeleteStudentByIdMutation,
  useGetAllAdminCourseQuery,
} from "@/Features/api/courseApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextField, IconButton } from "@mui/material";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Delete, DeleteIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const confirmDelete = (student) => {
    setSelectedStudent(student);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      await removeStudentHandle(selectedStudent._id, selectedStudent.courseId);
      setShowDialog(false);
    }
  };

  const { data, isLoading, error, refetch } = useGetAllAdminCourseQuery();
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [DeleteStudentById] = useDeleteStudentByIdMutation();
  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error)
    return (
      <h1 className=" text-center">
        Error loading data. Please try again later.
      </h1>
    );

  console.log("<<<data", data);

  const transformData = (courses) => {
    return courses.flatMap((course) =>
      course?.enrolledStudents?.map((student) => ({
        _id: student?._id,
        studentName: student?.name,
        studentEmail: student?.email,
        courseTitle: course?.courseTitle,
        courseCategory: course?.category,
        coursePrice: course?.coursePrice,
        courseLevel: course?.courseLevel,
        courseThumbnail: course?.courseThumbnail,
        courseId: course?._id,
      }))
    );
  };

  const transformedData = data?.courses ? transformData(data.courses) : [];

  const removeStudentHandle = async (studentId, courseId) => {
    try {
      const result = await DeleteStudentById({ studentId, courseId }); // Send both IDs
      console.log("<<<result", result);
      refetch();
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const removeLoading = false;
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Enrolled Students
      </h1>
      {transformedData.length > 0 ? (
        <Accordion type="single" collapsible>
          {transformedData.map((student, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div className="flex items-center justify-between w-full">
                {/* Left Side: Student Name, Switch, Label */}
                <div className="flex items-center gap-4">
                  <AccordionTrigger>{student.studentName}</AccordionTrigger>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="is-preview-free"
                    checked={isPreviewFree}
                    onCheckedChange={(checked) => setIsPreviewFree(checked)}
                  />
                  <Label htmlFor="is-preview-free">User Status</Label>

                  {/* Right Side: Delete Icon */}

                  <Button
                    disabled={removeLoading}
                    variant="destructive"
                    onClick={() => confirmDelete(student)}
                  >
                    <DeleteIcon className="text-lg" />
                  </Button>

                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. The student will be
                          removed from the course.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={removeLoading}
                          variant="destructive"
                          onClick={handleDelete}
                        >
                          {removeLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Confirm"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <AccordionContent>
                <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg items-center">
                  <div className="flex flex-col w-full md:w-3/4 gap-4">
                    <TextField
                      label="Student Name"
                      value={student?.studentName}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      className=" rounded-lg"
                    />
                    <a
                      href={`mailto:${student?.studentEmail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full p-4 border rounded-lg text-blue-500 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {student?.studentEmail}
                    </a>

                    <TextField
                      label="Course Title"
                      value={student?.courseTitle}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      className="rounded-lg"
                    />
                    <TextField
                      label="Category"
                      value={student?.courseCategory}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      className="rounded-lg"
                    />
                    <TextField
                      label="Price"
                      value={`$${student?.coursePrice}`}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      className="rounded-lg"
                    />
                    <TextField
                      label="Level"
                      value={student?.courseLevel}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/4 flex justify-center">
                    <img
                      src={student.courseThumbnail}
                      alt="Course Thumbnail"
                      className="-full h-36 object-cover rounded-t-lg"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <h2 className="text-center">No students enrolled in any courses.</h2>
      )}
    </div>
  );
};

export default Students;
