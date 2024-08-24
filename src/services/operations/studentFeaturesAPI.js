import { toast } from "react-hot-toast"
import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {ENROLL_COURSES_API} = studentEndpoints

export async function enrollInCourses(token, courses, dispatch, navigate) {
  const toastId = toast.loading("Enrolling in courses...");
  try {
    // Call the API to enroll the student in the courses
    console.log(courses)
    const response = await apiConnector(
      "POST",
      ENROLL_COURSES_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Enrolled in courses successfully!");
    console.log("successfully enrolled")
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("failed to enroll")
    console.error("Error enrolling in courses:", error);
    toast.error("Failed to enroll in courses.");
  } finally {
    toast.dismiss(toastId);
  }
}
