# Shared theme helpers for the base R and ggplot2 panels. Every number comes from theme.json.
suppressPackageStartupMessages({library(jsonlite); library(grid)})
if (is.null(dev.list())) grDevices::pdf(NULL)   # keep ggplot2/grid from opening a stray Rplots.pdf

script_dir <- function() {
  args <- commandArgs(trailingOnly = FALSE)
  f <- sub("^--file=", "", args[grepl("^--file=", args)][1])
  if (is.na(f)) getwd() else dirname(normalizePath(f))
}
HERE <- script_dir()
OUT  <- normalizePath(file.path(HERE, ".."))          # optimized/
DATA <- normalizePath(file.path(OUT, ".."))           # example_plot/ (original CSVs, unchanged)
TH   <- fromJSON(file.path(OUT, "theme.json"))

GROUPS <- TH$groups
PAL    <- unlist(TH$colors)[GROUPS]
PCH    <- c(circle = 21, square = 22, triangle = 24, diamond = 23)[unlist(TH$shapes)[GROUPS]]
names(PCH) <- GROUPS
FONT   <- TH$font$family
BASE_PT <- TH$size_pt$tick                                # device pointsize; cex = 1 is a tick label

pt_lwd   <- function(pt) pt / 0.75                        # base R: lwd 1 = 1/96 in = 0.75 pt
mm_cex   <- function(mm) mm / 1.11 * 7 / BASE_PT          # calibrated: pch 21, cex 1, ps 7 -> 1.11 mm
gg_size  <- function(mm) mm / 0.75                        # calibrated: shape 21, size 1 -> 0.75 mm
gg_lw    <- function(pt) pt / 0.75 / (72.27 / 25.4)       # ggplot2 linewidth -> lwd -> pt
gg_stroke <- function(pt) pt / 0.75 * 2 / (96 / 25.4)
line_mm  <- function() BASE_PT * 1.2 / 72 * 25.4          # one base-R margin line in mm
alpha_hex <- function(hex, a) grDevices::adjustcolor(hex, alpha.f = a)
seq_ramp <- function(n = 64) grDevices::colorRampPalette(TH$sequential)(n)

# Open a panel-sized cairo PDF with absolute margins in mm.
open_panel <- function(path, margins = TH$panel_mm) {
  grDevices::cairo_pdf(path, width = TH$panel_mm$width / 25.4, height = TH$panel_mm$height / 25.4,
                       pointsize = BASE_PT, family = FONT)
  par(mai = c(margins$margin_bottom, margins$margin_left, margins$margin_top, margins$margin_right) / 25.4,
      family = FONT, las = 1, xaxs = "i", yaxs = "i", bty = "n",
      cex.axis = 1, cex.lab = TH$size_pt$axis_title / BASE_PT,
      lwd = pt_lwd(TH$lw_pt$axis), tcl = -TH$tick_mm / line_mm(), mgp = c(3, 0.5, 0))
}
# Axis with L-shaped frame: 0.5 pt lines, ticks pointing out.
axis_pt <- function(side, at, labels = at, ...) {
  axis(side, at = at, labels = labels, lwd = 0, lwd.ticks = pt_lwd(TH$lw_pt$axis), ...)
  lines(if (side %in% c(1, 3)) range(at) else par("usr")[1:2][c(1, 1)],
        if (side %in% c(1, 3)) par("usr")[3:4][c(1, 1)] else range(at), lwd = pt_lwd(TH$lw_pt$axis), xpd = NA)
}
axis_line <- function(side, at) {       # draw the axis line exactly along the plot edge
  u <- par("usr")
  if (side == 1) lines(u[1:2], c(u[3], u[3]), lwd = pt_lwd(TH$lw_pt$axis), xpd = NA)
  if (side == 2) lines(c(u[1], u[1]), u[3:4], lwd = pt_lwd(TH$lw_pt$axis), xpd = NA)
}
y_title <- function(label, line = TH$title_offset_mm$y / line_mm()) mtext(label, side = 2, line = line, las = 0, cex = TH$size_pt$axis_title / BASE_PT)
x_title <- function(label, line = TH$title_offset_mm$x / line_mm() - 0.1) mtext(label, side = 1, line = line, cex = TH$size_pt$axis_title / BASE_PT)
note <- function(text, x, y, adj = c(0, 1)) text(x, y, text, adj = adj, cex = TH$size_pt$note / BASE_PT, col = TH$note_color, xpd = NA)

# Staggered category labels: alternate lines so full group names never overlap or rotate.
staggered_labels <- function(at, labels, line1 = 0.5, line2 = 1.5) {
  for (i in seq_along(at)) mtext(labels[i], side = 1, at = at[i], line = if (i %% 2 == 1) line1 else line2, cex = 1)
}

# ggplot2: fix the panel to an absolute size and position so its axes align with the base R panels.
gg_theme <- function() {
  ggplot2::theme_classic(base_size = TH$size_pt$tick, base_family = FONT) +
    ggplot2::theme(axis.line = ggplot2::element_line(linewidth = gg_lw(TH$lw_pt$axis), lineend = "square"),
                   axis.ticks = ggplot2::element_line(linewidth = gg_lw(TH$lw_pt$axis)),
                   axis.ticks.length = grid::unit(TH$tick_mm, "mm"),
                   axis.text = ggplot2::element_text(size = TH$size_pt$tick, colour = "black"),
                   axis.title = ggplot2::element_text(size = TH$size_pt$axis_title, colour = "black"),
                   plot.margin = grid::unit(c(0, 0, 0, 0), "mm"), legend.position = "none")
}
save_gg_panel <- function(p, path, margins = TH$panel_mm) {
  grDevices::cairo_pdf(path, width = TH$panel_mm$width / 25.4, height = TH$panel_mm$height / 25.4, family = FONT)
  g <- ggplot2::ggplotGrob(p)                                  # device is open, so text metrics use the real font
  lay <- g$layout[g$layout$name == "panel", ]
  pw <- TH$panel_mm$width - margins$margin_left - margins$margin_right
  ph <- TH$panel_mm$height - margins$margin_top - margins$margin_bottom
  g$widths[lay$l] <- grid::unit(pw, "mm"); g$heights[lay$t] <- grid::unit(ph, "mm")
  # y-axis column: ticks + labels + space so that the title centre sits title_offset_mm$y from the axis line.
  axis_col <- g$layout$l[g$layout$name == "axis-l"]
  g$widths[axis_col] <- grid::unit(TH$title_offset_mm$y - 1, "mm")     # 1 mm = axis.title.y right margin
  to_mm <- function(u) sapply(seq_along(u), function(i) grid::convertUnit(u[i], "mm", valueOnly = TRUE))
  w <- to_mm(g$widths); h <- to_mm(g$heights)
  g$widths[1] <- grid::unit(margins$margin_left - sum(w[2:(lay$l - 1)]), "mm")
  g$widths[length(w)] <- grid::unit(TH$panel_mm$width - margins$margin_left - pw - sum(w[(lay$r + 1):(length(w) - 1)]), "mm")
  g$heights[length(h)] <- grid::unit(margins$margin_bottom - sum(h[(lay$b + 1):(length(h) - 1)]), "mm")
  g$heights[1] <- grid::unit(TH$panel_mm$height - margins$margin_bottom - ph - sum(h[2:(lay$t - 1)]), "mm")
  grid::grid.draw(g); invisible(dev.off())   # no grid.newpage: the device page is already open
}
