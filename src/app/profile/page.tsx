"use client";

import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useUser } from "@/features/user/hooks/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const profileSchema = z.object({
  first_name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  username: z.string().min(1, "نام کاربری الزامی است"),
  bio: z.string().optional(),
  contact_info: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { useGetUserInfo, useUpdateUserInfo } = useUser();
  const { data: user, isLoading } = useGetUserInfo();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateUserInfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        contact_info: user.contact_info,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
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
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          پروفایل کاربری
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                fullWidth
                id="first_name"
                label="نام"
                autoComplete="given-name"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register("first_name")}
              />
              <TextField
                required
                fullWidth
                id="last_name"
                label="نام خانوادگی"
                autoComplete="family-name"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register("last_name")}
              />
            </Stack>

            <TextField
              required
              fullWidth
              id="email"
              label="ایمیل"
              autoComplete="email"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <TextField
              required
              fullWidth
              id="username"
              label="نام کاربری"
              autoComplete="username"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username")}
            />

            <TextField
              fullWidth
              id="bio"
              label="بیوگرافی"
              multiline
              rows={4}
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.bio}
              helperText={errors.bio?.message}
              {...register("bio")}
            />

            <TextField
              fullWidth
              id="contact_info"
              label="اطلاعات تماس"
              multiline
              rows={2}
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.contact_info}
              helperText={errors.contact_info?.message}
              {...register("contact_info")}
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isUpdating}
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
            {isUpdating ? "در حال بروزرسانی..." : "بروزرسانی پروفایل"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}