"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonLoader = ({ type = "card", width = "100%" }) => {
  if (type === "card") {
    return (
      <Box sx={{ width: width, marginRight: 2, my: 3 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
          sx={{
            borderRadius: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box sx={{ pt: 1 }}>
          <Skeleton
            animation="wave"
            height={24}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          />
          <Skeleton
            width="60%"
            animation="wave"
            height={20}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          />
        </Box>
      </Box>
    );
  }

  if (type === "caseStudy") {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "20px",
          border: "2px solid rgba(0,0,0, 0.3)",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          height: 450,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={220}
          animation="wave"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        <Box
          sx={{
            flex: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton
              variant="text"
              height={32}
              animation="wave"
              sx={{
                mb: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "85%",
              }}
            />
            <Skeleton
              variant="text"
              height={32}
              animation="wave"
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "65%",
              }}
            />

            <Skeleton
              variant="text"
              width="95%"
              height={20}
              animation="wave"
              sx={{
                mb: 0.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height={20}
              animation="wave"
              sx={{
                mb: 0.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="70%"
              height={20}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            p: 0,
            height: 80,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderTopRightRadius: "20px",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: 200,
            }}
          >
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              animation="wave"
              sx={{
                backgroundColor: "rgba(37, 211, 102, 0.3)",
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Skeleton
                variant="circular"
                width={16}
                height={16}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={20}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <Skeleton
              variant="text"
              width={40}
              height={14}
              animation="wave"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                mb: 0.5,
              }}
            />

            <Skeleton
              variant="text"
              width={80}
              height={18}
              animation="wave"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.15)",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  if (type === "communityStudy") {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "20px",
          border: "2px solid rgba(58, 58, 58, 0.5)",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          minHeight: 320,
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 2.5 }}>
            <Skeleton
              variant="text"
              height={32}
              animation="wave"
              sx={{
                mb: 0.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "95%",
              }}
            />
            <Skeleton
              variant="text"
              height={32}
              animation="wave"
              sx={{
                mb: 0.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "85%",
              }}
            />
            <Skeleton
              variant="text"
              height={32}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "60%",
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="95%"
              height={20}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height={20}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="75%"
              height={20}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* WhatsApp icon placeholder */}
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
              sx={{
                backgroundColor: "rgba(37, 211, 102, 0.3)", // WhatsApp green tint
              }}
            />

            {/* Learn More button placeholder */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                width={16}
                height={16}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              />
              <Skeleton
                variant="text"
                width={90}
                height={18}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              />
            </Box>
          </Box>

          {/* Right side - Author info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            {/* "Author" label */}
            <Skeleton
              variant="text"
              width={45}
              height={14}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                mb: 0.5,
              }}
            />
            {/* Author name */}
            <Skeleton
              variant="text"
              width={90}
              height={18}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  if (type === "article") {
    return (
      <Box
        sx={{
          width: "100%",
          mb: 3,
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          height: 250,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={200}
          height="100%"
          animation="wave"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            flex: 1,
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton
              variant="text"
              height={28}
              animation="wave"
              sx={{
                mb: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "90%",
              }}
            />
            <Skeleton
              variant="text"
              height={28}
              animation="wave"
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                width: "70%",
              }}
            />

            <Skeleton
              variant="text"
              width="95%"
              height={18}
              animation="wave"
              sx={{
                mb: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="85%"
              height={18}
              animation="wave"
              sx={{
                mb: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="60%"
              height={18}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                animation="wave"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </Box>

            <Skeleton
              variant="text"
              width={100}
              height={20}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  if (type === "news") {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: 300,
          padding: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        <Box
          sx={{
            flex: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Skeleton
              variant="text"
              height={16}
              animation="wave"
              sx={{
                mb: 0.5,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                width: "90%",
              }}
            />
            <Skeleton
              variant="text"
              height={16}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                width: "65%",
              }}
            />
          </Box>

          <Box sx={{ flex: 1, mb: 2 }}>
            <Skeleton
              variant="text"
              width="100%"
              height={12}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="95%"
              height={12}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="88%"
              height={12}
              animation="wave"
              sx={{
                mb: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="70%"
              height={12}
              animation="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Skeleton
              variant="text"
              width={90}
              height={20}
              animation="wave"
              sx={{
                backgroundColor: "rgba(34, 197, 234, 0.3)",
                borderRadius: 1,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={16}
              height={12}
              animation="wave"
              sx={{
                backgroundColor: "rgba(34, 197, 234, 0.3)", // Arrow icon placeholder
                borderRadius: 0.5,
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Skeleton
      animation="wave"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    />
  );
};

export default SkeletonLoader;
