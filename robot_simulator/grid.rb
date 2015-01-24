# encoding: utf-8

require 'singleton'

class Grid
  include Singleton

  attr_accessor :x_min, :y_min, :x_max, :y_max

  def initialize
    @x_min, @y_min = 0, 0
    @x_max, @y_max = 4, 4
  end

  def inside?(x, y)
    x >= x_min && y >= y_min && x <= x_max && y <= y_max
  end
end
