import React, { memo } from "react";
import { Avatar, Badge, Box, Button, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProfileEmployeesTab = () => {
  return (
    <>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      {/* <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      {/* <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>

      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>

      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>

      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack>

      <Stack flexDirection="row" alignItems="center" sx={{ py: 2.5 }}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "background.paper",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 50,
                  boxShadow: 1,
                }}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  4.5
                </Typography>
              </Stack>
            }
            sx={{
              "& .MuiBadge-badge": {
                right: "auto",
                left: "50%",
                transform: `translate(-50%, 100%)`,
              },
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt=""
              src="/static/images/avatar/2.jpg"
            />
          </Badge>
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Raducu Balgiu
            </Typography>
            <Typography color="text.secondary">Stylist</Typography>
          </Box>
        </Stack>

        <Button
          sx={{ ml: 20 }}
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
        >
          Urmaresti
        </Button>
      </Stack> */}
    </>
  );
};

export default memo(ProfileEmployeesTab);
