#!/usr/bin/env ruby
# encoding: utf-8

require_relative 'plateau'
require_relative 'rover'

puts 'Input coordinates and commands (then enter "S" to launch):'

plateau_coordinates = gets.split(/\s/, 2).map(&:to_i)

settings = []

while (cmd = gets).strip! != 'S'
  lru_cmd = settings.last

  if lru_cmd && lru_cmd.size == 1
    lru_cmd[:cmd] = cmd
  else
    settings << { initial_coordinates: cmd }
  end
end

plateau = Plateau.instance
plateau.x_ur, plateau.y_ur = plateau_coordinates

puts 'Output:'

settings.each do |s|
  if s.size == 2
    coordinates = s[:initial_coordinates].split(/\s/, 3)
    rover = Rover.new(*coordinates.first(2).map(&:to_i), coordinates.last)
    rover.command s[:cmd]
    puts '%s %s %s' % [rover.x, rover.y, rover.direction]
  end

  puts
end
