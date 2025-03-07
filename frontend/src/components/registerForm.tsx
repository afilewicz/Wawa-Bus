import React from "react";
import {
  Stack,
  Container,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormErrorMessage,
  useBoolean,
  Icon,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { confirmPasswordRules, emailPattern, passwordRules } from "@/utils";
import Link from "next/link";
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { type RegisterData } from "@/types";
import { signup } from "@/api-calls/auth";
import useCustomToast from "@/hooks/useCustomToast";
import { redirect } from "next/navigation";

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

const registerForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [show1, setShow1] = useBoolean(false);
  const [show2, setShow2] = useBoolean(false);
  const showToast = useCustomToast();

  const onSubmit = async (data: RegisterData) => {
    const response = await signup(data);
    if (response.status) {
      showToast(
        "Account created successfully",
        "You can now log in",
        "success"
      );
      redirect("/auth/login");
    } else {
      showToast("An error occurred", response.message, "error");
    }
  };

  return (
    <Container as="form" maxW="sm" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        gap={4}
        rounded="md"
        p={4}
        shadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Sign up
        </Text>
        <FormControl id="email_address" isInvalid={!!errors.email}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: emailPattern,
              })}
              placeholder="Email"
              variant="filled"
              required
            />
          </InputGroup>
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" srOnly>
            Password
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type={show1 ? "text" : "password"}
              {...register("password", passwordRules())}
              variant="filled"
              placeholder="Password"
              required
            />
            <InputRightElement width="2.5rem" _hover={{ cursor: "pointer" }}>
              <Icon
                as={show1 ? ViewOffIcon : ViewIcon}
                onClick={setShow1.toggle}
                aria-label={show1 ? "Hide password" : "Show password"}
              >
                {show1 ? <ViewOffIcon /> : <ViewIcon />}
              </Icon>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type={show2 ? "text" : "password"}
              {...register("confirmPassword", confirmPasswordRules(getValues))}
              variant="filled"
              placeholder="Repeat Password"
              required
            />
            <InputRightElement width="2.5rem" _hover={{ cursor: "pointer" }}>
              <Icon
                as={show2 ? ViewOffIcon : ViewIcon}
                onClick={setShow2.toggle}
                aria-label={show2 ? "Hide password" : "Show password"}
              >
                {show2 ? <ViewOffIcon /> : <ViewIcon />}
              </Icon>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>
              {errors.confirmPassword.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button border="1px" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
        <Text textAlign="center">
          Already have an account?{" "}
          <Button variant="link" color="blue.500" textAlign="center">
            <Link href={"login"}>Sign in</Link>
          </Button>
        </Text>
      </Stack>
    </Container>
  );
};

export default registerForm;
