# encoding: utf-8

require 'singleton'

class Plateau
  include Singleton

  attr_accessor :x_bl, :y_bl, :x_ur, :y_ur

  def initialize
    @x_bl, @y_bl = 0, 0
  end
end
