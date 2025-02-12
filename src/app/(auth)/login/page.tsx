"use client";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import NextLink from "next/link";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/lib/utils/utils";

const loginSchema = z.object({
  root: z.string().optional(),
  username: z.string().min(1, "نام کاربری الزامی است"),
  password: z.string().min(2, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { useLogin } = useAuth();
  const { mutate } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      mutate(data, {
        onSuccess: (data) => {
          // TODO: store tokens in cookies and local storage
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("isLogin", "true");
          router.push("/");
          showToast.success("به پنل کاربری خود خوش آمدید");
        },
        onError: () => {
          setError("root", {
            message: "نام کاربری یا رمز عبور اشتباه است",
          });
        },
      });
    } catch (err) {
      setError("root", {
        message: "نام کاربری یا رمز عبور اشتباه است" + err,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          ورود به حساب کاربری
        </Typography>

        {errors.root && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.root.message}
          </Typography>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            id="username"
            label="نام کاربری"
            autoComplete="username"
            autoFocus
            InputProps={{ sx: { borderRadius: 2 } }}
            dir="rtl"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{ sx: { borderRadius: 2 } }}
            dir="rtl"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
              "&:disabled": {
                backgroundColor: (theme) => theme.palette.action.disabled,
              },
            }}
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link
              component={NextLink}
              href="/signup"
              variant="body1"
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  textDecoration: "underline",
                  color: (theme) => theme.palette.primary.light,
                },
              }}
            >
              حساب کاربری ندارید؟ ثبت‌نام کنید
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
