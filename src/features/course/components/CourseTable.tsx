import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Stack,
  TablePagination,
} from "@mui/material";
import { Course } from "../types/course.types";

interface CourseTableProps {
  courses: Course[];
  onRequestClick: (course: Course) => void;
  page: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export default function CourseTable({
  courses,
  onRequestClick,
  page,
  totalItems,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: CourseTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {courses.map((course) => (
          <Card key={course.id} sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {course.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                استاد: {course.teacherName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                نیمسال: {course.semester}
              </Typography>
              {/* <Typography color="text.secondary" gutterBottom>
                شرایط: {course.condition}
              </Typography> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => onRequestClick(course)}
                sx={{ mt: 1 }}
                fullWidth
              >
                درخواست
              </Button>
            </CardContent>
          </Card>
        ))}
        <TablePagination
          component="div"
          count={totalItems}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="تعداد در هر صفحه"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
          }
        />
      </Stack>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام درس</TableCell>
              <TableCell>استاد</TableCell>
              <TableCell>نیمسال</TableCell>
              {/* <TableCell>شرایط</TableCell> */}
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.teacherName}</TableCell>
                <TableCell>{course.semester}</TableCell>
                {/* <TableCell>{course.condition}</TableCell> */}
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onRequestClick(course)}
                  >
                    درخواست
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="تعداد در هر صفحه"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
        }
      />
    </>
  );
} 